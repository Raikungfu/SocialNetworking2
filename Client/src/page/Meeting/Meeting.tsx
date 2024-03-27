import { useEffect, useRef, useState } from "react";
import Button from "../../component/Layout/Button";
import StreamVideo from "../../component/Layout/StreamVideo";
import Form from "../../component/Layout/Form/FormInputWithAttachFile";
import { IndividualSendMessage } from "../../component/Layout/Form/FormInputWithAttachFile/types";
import socket from "../../config/socketIO";
import { peer, ICE } from "./type";
import { configuration } from "../../type/constant";

const Meeting = () => {
  const [videosStream, setVideosStream] = useState<JSX.Element[]>([]);
  let localStream: MediaStream;
  const [roomId, setRoomId] = useState<string>("");
  let roomCurrent: string = "";
  const prevRoom: string = "";
  const [isJoinAnotherRoom, setIsJoinAnotherRoom] = useState<boolean>(false);
  const roomIdRef = useRef<HTMLSpanElement>(null);

  let listPeerConnection: Array<peer> = [];

  useEffect(() => {
    const handleNewUserJoin = async (userId: string) => {
      const peerConnection = new RTCPeerConnection(configuration);
      const remoteStream = new MediaStream();
      listPeerConnection.push({
        userId: userId,
        rtcPeer: peerConnection,
        remoteStream,
        listCandidate: [],
      });
      console.log(listPeerConnection);
      await createOffer(roomCurrent, listPeerConnection.slice(-1)[0], userId);
    };

    const handleReceiveOffer = async (roomRef: ICE) => {
      const peerConnection = new RTCPeerConnection(configuration);
      const remoteStream = new MediaStream();
      listPeerConnection.push({
        userId: roomRef._userId,
        rtcPeer: peerConnection,
        remoteStream,
        listCandidate: [],
      });
      await createAnswer(roomRef, listPeerConnection.slice(-1)[0]);
    };

    socket.on("new-user-join", handleNewUserJoin);
    socket.on("receive-offer", handleReceiveOffer);
    return () => {
      socket.emit("user_leave_room", roomCurrent);
    };
  }, []);

  useEffect(() => {
    if (prevRoom && prevRoom !== roomCurrent && isJoinAnotherRoom) {
      socket.emit("user_leave_room", prevRoom);
      setIsJoinAnotherRoom(false);
    }
  }, [isJoinAnotherRoom, prevRoom, roomCurrent, roomId]);

  const init = async (roomId: string) => {
    roomCurrent = roomId;
    setVideosStream([]);
    listPeerConnection = [];
    setIsJoinAnotherRoom(true);
    if (!localStream) {
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: true,
      });
      localStream = stream;
      setVideosStream([
        <StreamVideo
          key={"localStream"}
          id={"localStream"}
          stream={localStream!}
          room={roomCurrent}
        />,
      ]);
    }
  };

  const createRoom = async () => {
    try {
      socket.emit("create:meeting", {}, async (_roomId: string) => {
        await init(_roomId);
        setRoomId(_roomId);
        if (roomIdRef.current) {
          roomIdRef.current.style.cssText = "color: green;";
          roomIdRef.current.textContent = `Current room:  ${_roomId}`;
        }
      });
    } catch (error) {
      console.error("Error creating room:", error);
    }
  };

  const joinRoomById = async (room: IndividualSendMessage) => {
    await init(room.content);
    try {
      socket.emit(
        "join:meeting",
        {
          roomId: room.content,
        },
        async (roomRef: ICE) => {
          if (roomRef._roomId) {
            setRoomId(roomRef._roomId);
            if (roomIdRef.current) {
              roomIdRef.current.style.cssText = "color: green;";
              roomIdRef.current.textContent = `Current room:  ${room.content}`;
            }
          } else {
            if (roomIdRef.current) {
              roomIdRef.current.style.cssText = "color: red;";
              roomIdRef.current.textContent = `INVALID ROOMID: ${room.content}`;
            }
          }
        }
      );
    } catch (error) {
      console.error("Error joining room:", error);
    }
  };

  const createPeerConnection = async (peerConnection: peer, room: string) => {
    setVideosStream((prev) => [
      ...prev,
      <StreamVideo
        key={"remoteStream"}
        id={"remoteStream"}
        stream={peerConnection.remoteStream}
        peerConnection={listPeerConnection.slice(-1)[0]}
        room={roomCurrent}
      />,
    ]);

    localStream?.getTracks().forEach((track) => {
      peerConnection.rtcPeer.addTrack(track, localStream);
    });

    peerConnection.rtcPeer.ontrack = (event) => {
      event.streams[0].getTracks().forEach((track) => {
        peerConnection.remoteStream.addTrack(track);
      });
    };

    peerConnection.rtcPeer.onicecandidate = async (event) => {
      if (event.candidate) {
        socket.emit("ice:candidate", {
          _userId: peerConnection.userId,
          _roomId: room,
          candidate: new RTCIceCandidate(event.candidate),
        });
      }
    };

    peerConnection?.rtcPeer.addEventListener("icegatheringstatechange", () => {
      console.log(
        `ICE gathering state changed: ${peerConnection?.rtcPeer.iceGatheringState}`
      );
      if (peerConnection?.rtcPeer.iceGatheringState === "complete") {
        console.log(peerConnection);
      }
    });

    peerConnection?.rtcPeer.addEventListener("signalingstatechange", () => {
      console.log(peerConnection?.rtcPeer.signalingState);
      if (
        peerConnection?.listCandidate &&
        peerConnection?.rtcPeer.signalingState === "stable"
      ) {
        peerConnection.listCandidate?.forEach((candidate) => {
          peerConnection?.rtcPeer.addIceCandidate(candidate);
        });
      }
    });

    peerConnection?.rtcPeer.addEventListener("connectionstatechange", () => {
      console.log(
        `Connection state change: ${peerConnection?.rtcPeer.connectionState}`
      );
    });

    peerConnection?.rtcPeer.addEventListener(
      "iceconnectionstatechange ",
      () => {
        console.log(
          `ICE connection state change: ${peerConnection?.rtcPeer.iceConnectionState}`
        );
      }
    );
  };

  const createOffer = async (
    id: string,
    peerConnection: peer,
    userId?: string
  ) => {
    await createPeerConnection(peerConnection, id);
    const offer = await peerConnection?.rtcPeer.createOffer();
    await peerConnection?.rtcPeer.setLocalDescription(offer);
    socket.emit("send:offer", {
      _roomId: id,
      offer: offer,
      _userId: userId,
    });
    console.log(listPeerConnection);
  };

  const createAnswer = async (roomRef: ICE, peerConnection: peer) => {
    try {
      alert("createAnswer");
      await createPeerConnection(peerConnection, roomRef._roomId);
      await peerConnection?.rtcPeer.setRemoteDescription(roomRef.offer);
      const answer = await peerConnection?.rtcPeer.createAnswer();
      await peerConnection?.rtcPeer.setLocalDescription(answer);
      socket.emit("join:meetingSuccess", {
        _userId: roomRef._userId,
        _roomId: roomCurrent,
        answer: answer,
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="p-20">
      <div id="buttons" className="flex flex-row gap-5">
        <Button
          id="openCamera"
          className="p-2 bg-red-500 text-white rounded-lg"
          label="Create new Room"
          onClick={createRoom}
        />
      </div>
      <div id="videosStream" className="flex flex-row">
        {videosStream.map((video) => video)}
      </div>
      <div className="fixed bottom-20 transform right-1/2 translate-x-1/2">
        <span
          className="text-base text-dark dark:text-white m-4 font-semibold"
          ref={roomIdRef}
        >
          No room here! Please enter roomId...
        </span>
        <Form
          formVariant=" items-center flex flex-row w-full"
          inputVariant="px-3 py-2 border focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-full"
          input={[
            {
              types: "text",
              id: "content",
              placeholder: "Search...",
              wrapInputVariant: "pr-[2rem]",
            },
          ]}
          id="chat-box"
          buttonLabel="Enter RoomId"
          buttonVariant="rounded-full text-white bg-red-600 text-base"
          onSubmitSuccess={joinRoomById}
          onSubmitFail={() => {}}
        />
      </div>
    </div>
  );
};

export default Meeting;

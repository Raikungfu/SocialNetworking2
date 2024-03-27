import { useEffect, useRef, useState } from "react";
import Button from "../../component/Layout/Button";
import StreamVideo from "../../component/Layout/StreamVideo";
import Form from "../../component/Layout/Form/FormInputWithAttachFile";
import { IndividualSendMessage } from "../../component/Layout/Form/FormInputWithAttachFile/types";
import socket from "../../config/socketIO";

interface ICE {
  _roomId: string;
  _userId: string;
  offer: {
    type: RTCSdpType;
    sdp: string;
  };
  answer: {
    type: RTCSdpType;
    sdp: string;
  };
}

const Meeting = () => {
  const [videosStream, setVideosStream] = useState<JSX.Element[]>([]);
  let localMediaStream: MediaStream;
  let localMediaStream2: MediaStream;
  let remoteMediaStream: MediaStream;
  const [roomId, setRoomId] = useState<string>("");
  let room: string = "";
  const roomIdRef = useRef<HTMLSpanElement>(null);

  const configuration: RTCConfiguration = {
    iceServers: [
      {
        urls: "stun:stun.relay.metered.ca:80",
      },
      {
        urls: "turn:global.relay.metered.ca:80",
        username: "f91d087726454191be59e9f8",
        credential: "iLnK9wcR7hpGV3F1",
      },
      {
        urls: "turn:global.relay.metered.ca:80?transport=tcp",
        username: "f91d087726454191be59e9f8",
        credential: "iLnK9wcR7hpGV3F1",
      },
      {
        urls: "turn:global.relay.metered.ca:443",
        username: "f91d087726454191be59e9f8",
        credential: "iLnK9wcR7hpGV3F1",
      },
      {
        urls: "turns:global.relay.metered.ca:443?transport=tcp",
        username: "f91d087726454191be59e9f8",
        credential: "iLnK9wcR7hpGV3F1",
      },
    ],
    iceCandidatePoolSize: 250,
  };

  let peerConnection: RTCPeerConnection;

  useEffect(() => {
    if (roomIdRef.current) {
      roomIdRef.current.textContent = "Current room: " + roomId;
    }
  }, [roomId]);

  const init = async () => {
    if (!localMediaStream) {
      localMediaStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      localMediaStream2 = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: true,
      });
      setVideosStream([
        <StreamVideo
          key={"localStream"}
          id={"localStream"}
          mediaStream={localMediaStream}
          displayStream={localMediaStream2}
        />,
      ]);
    }
  };

  const createPeerConnection = async (room: string) => {
    peerConnection = new RTCPeerConnection(configuration);

    remoteMediaStream = new MediaStream();
    setVideosStream((prev) => [
      ...prev,
      <StreamVideo
        key={"remoteStream"}
        id={"remoteStream"}
        mediaStream={remoteMediaStream}
      />,
    ]);

    localMediaStream?.getTracks().forEach((track) => {
      peerConnection.addTrack(track, localMediaStream);
    });

    peerConnection.ontrack = (event) => {
      event.streams[0].getTracks().forEach((track) => {
        remoteMediaStream.addTrack(track);
      });
    };

    peerConnection.onicecandidate = async (event) => {
      if (event.candidate) {
        socket.emit("ice:candidate", {
          _roomId: room,
          candidate: new RTCIceCandidate(event.candidate),
        });
      }
    };

    peerConnection.addEventListener("icegatheringstatechange", () => {
      console.log(
        `ICE gathering state changed: ${peerConnection?.iceGatheringState}`
      );
      console.log(peerConnection);
    });

    peerConnection.addEventListener("signalingstatechange", () => {
      console.log(peerConnection.signalingState);
    });

    peerConnection?.addEventListener("connectionstatechange", () => {
      console.log(
        `Connection state change: ${peerConnection?.connectionState}`
      );
      console.log(peerConnection);
    });

    peerConnection?.addEventListener("iceconnectionstatechange ", () => {
      console.log(
        `ICE connection state change: ${peerConnection?.iceConnectionState}`
      );
      console.log(peerConnection);
    });
  };

  const createOffer = async (id: string) => {
    await createPeerConnection(id);
    const offer = await peerConnection?.createOffer();
    await peerConnection?.setLocalDescription(offer);
    socket.emit("update:meeting", {
      _roomId: id,
      offer: offer,
    });
  };

  const createAnswer = async (roomRef: ICE) => {
    room = roomRef._roomId;
    await createPeerConnection(roomRef._roomId);
    await peerConnection?.setRemoteDescription(roomRef.offer);
    const answer = await peerConnection?.createAnswer();
    await peerConnection?.setLocalDescription(answer);
    socket.emit("join:meetingSuccess", {
      _roomId: roomRef._roomId,
      offer: roomRef.offer,
      answer: answer,
    });
    setRoomId(roomRef._roomId);
  };

  const createRoom = async () => {
    await init();
    try {
      socket.emit("create:meeting", {}, async (_roomId: string) => {
        setRoomId(_roomId);
        await createOffer(_roomId);
      });
    } catch (error) {
      console.error("Error creating room:", error);
    }
  };

  const joinRoomById = async (room: IndividualSendMessage) => {
    try {
      await init();
      socket.emit(
        "join:meeting",
        {
          roomId: room.content,
        },
        async (roomRef: ICE) => {
          if (roomRef._roomId) {
            setRoomId(roomRef._roomId);
            await createAnswer(roomRef);
          } else {
            if (roomIdRef.current)
              roomIdRef.current.textContent = "Not found!!!";
          }
        }
      );
    } catch (error) {
      console.error("Error joining room:", error);
    }
  };

  const handleUserJoinRoom = async (data: ICE) => {
    try {
      if (!peerConnection.currentRemoteDescription && data.answer) {
        console.log(data.answer);
        await peerConnection.setRemoteDescription(data.answer);
        socket.emit(
          "get:iceCandidateSuccess",
          { _roomId: room, answer: data.answer },
          (data: RTCIceCandidate[]) => {
            console.log(data);
            data.forEach((dt) =>
              peerConnection
                ?.addIceCandidate(dt)
                .then(() => {
                  console.log(dt);
                  console.log("ICE candidate added successfully");
                })
                .catch((error) => {
                  console.error("Error adding ICE candidate:", error);
                })
            );
            console.log(peerConnection.iceGatheringState);
          }
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleNewCandidate = (data: RTCIceCandidateInit) => {
    const candidate = new RTCIceCandidate(data);
    console.log(candidate);
    peerConnection
      ?.addIceCandidate(candidate)
      .then(() => {
        console.log(candidate);
        console.log("ICE candidate added successfully");
      })
      .catch((error) => {
        console.error("Error adding ICE candidate:", error);
      });
  };

  useEffect(() => {
    socket.on("ice_candidate", handleNewCandidate);
    socket.on("join_room_success", handleUserJoinRoom);

    return () => {
      socket.off("ice_candidate", handleNewCandidate);
      socket.off("join_room_success", handleUserJoinRoom);
    };
  }, []);

  return (
    <div className="p-20">
      <div
        id="videosStream"
        className="flex flex-row w-10/12 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 fixed bg-red-50 h-5/6"
      >
        <Button
          id="openCamera"
          className="absolute p-2 bg-red-500 z-50 text-white rounded-lg"
          label="Create new Room"
          onClick={createRoom}
        />
        {videosStream.map((video) => video)}
      </div>
      <div className="fixed bottom-20 transform right-1/2 translate-x-1/2">
        <span className="text-base text-red-500 m-4" ref={roomIdRef}></span>
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

import { useEffect, useRef, useState } from "react";
import Button from "../../component/Layout/Button";
import StreamVideo from "../../component/Layout/StreamVideo";
import Form from "../../component/Layout/Form/FormInputWithAttachFile";
import { IndividualSendMessage } from "../../component/Layout/Form/FormInputWithAttachFile/types";
import socket from "../../config/socketIO";

interface Meeting {
  _id: string;
  peer: Array<{
    _id: string;
    offer: {
      type: RTCSdpType;
      sdp: string;
    };
    answer: {
      type: RTCSdpType;
      sdp: string;
    };
  }>;
}

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
  let localStream: MediaStream;
  let remoteStream: MediaStream;
  const [roomId, setRoomId] = useState<string>("");
  let room: string = "";
  const roomIdRef = useRef<HTMLSpanElement>(null);

  const configuration: RTCConfiguration = {
    iceServers: [
      {
        urls: "turn:global.relay.metered.ca:80?transport=tcp",
        username: "4be13f8c832bf26e47032183",
        credential: "vIAZTGWsF/apHqZU",
      },
      {
        urls: "turns:global.relay.metered.ca:443?transport=tcp",
        username: "4be13f8c832bf26e47032183",
        credential: "vIAZTGWsF/apHqZU",
      },
      {
        urls: "stun:stun.relay.metered.ca:80",
      },
      {
        urls: "turn:global.relay.metered.ca:80",
        username: "4be13f8c832bf26e47032183",
        credential: "vIAZTGWsF/apHqZU",
      },
      {
        urls: "turn:global.relay.metered.ca:443",
        username: "4be13f8c832bf26e47032183",
        credential: "vIAZTGWsF/apHqZU",
      },
    ],
    iceCandidatePoolSize: 10,
  };

  let peerConnection: RTCPeerConnection;

  useEffect(() => {
    if (roomIdRef.current) {
      roomIdRef.current.textContent = "Current room: " + roomId;
    }
  }, [roomId]);

  const init = async () => {
    if (!localStream) {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      localStream = stream;
      if (localStream) {
        setVideosStream([
          <StreamVideo
            key={"localStream"}
            id={"localStream"}
            stream={localStream!}
          />,
        ]);
      }
    }
  };

  const createPeerConnection = async (room: string) => {
    peerConnection = new RTCPeerConnection(configuration);

    remoteStream = new MediaStream();
    setVideosStream((prev) => [
      ...prev,
      <StreamVideo
        key={"remoteStream"}
        id={"remoteStream"}
        stream={remoteStream}
      />,
    ]);

    localStream?.getTracks().forEach((track) => {
      peerConnection.addTrack(track, localStream);
    });

    peerConnection.ontrack = (event) => {
      event.streams[0].getTracks().forEach((track) => {
        remoteStream.addTrack(track);
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
    room = id;
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
      // await init();
      if (!localStream) {
        const stream = await navigator.mediaDevices.getDisplayMedia({
          video: {
            displaySurface: "browser",
          },
        });
        localStream = stream;
        if (localStream) {
          setVideosStream([
            <StreamVideo
              key={"localStream"}
              id={"localStream"}
              stream={localStream!}
            />,
          ]);
        }
      }
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
    peerConnection
      ?.addIceCandidate(candidate)
      .then(() => {
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
      <div id="buttons" className="flex flex-row gap-5">
        <Button
          id="openCamera"
          className="p-2 bg-red-500 text-white rounded-lg"
          label="Create new Room"
          onClick={createRoom}
        />
      </div>
      <div>
        <span id="currentRoom"></span>
      </div>
      <div id="videosStream" className="flex flex-row">
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

import { useEffect, useRef, useState } from "react";
import Button from "../../component/Layout/Button";
import StreamVideo from "../../component/Layout/StreamVideo";
import Form from "../../component/Layout/Form/FormInputWithAttachFile";
import { IndividualSendMessage } from "../../component/Layout/Form/FormInputWithAttachFile/types";
import socket from "../../config/socketIO";
import { useSelector } from "react-redux";
import { RootState } from "../../hook/rootReducer";

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
  const me = useSelector((state: RootState) => state.user.userState.id);
  const [videosStream, setVideosStream] = useState<JSX.Element[]>([]);
  let localStream: MediaStream;
  let remoteStream: MediaStream;
  const [roomId, setRoomId] = useState<string>("");

  const roomIdRef = useRef<HTMLSpanElement>(null);

  const configuration: RTCConfiguration = {
    iceServers: [
      {
        urls: ["stun:stun.l.google.com:19302", "stun:stun1.l.google.com:19302"],
      },
    ],
  };

  let peerConnection: RTCPeerConnection;

  // const configuration: RTCConfiguration = {
  //   iceServers: [
  //     { urls: "stun:stun.relay.metered.ca:80" },
  //     {
  //       urls: "turn:global.relay.metered.ca:80",
  //       username: "4be13f8c832bf26e47032183",
  //       credential: "vIAZTGWsF/apHqZU",
  //     },
  //     {
  //       urls: "turn:global.relay.metered.ca:80?transport=tcp",
  //       username: "4be13f8c832bf26e47032183",
  //       credential: "vIAZTGWsF/apHqZU",
  //     },
  //     {
  //       urls: "turn:global.relay.metered.ca:443",
  //       username: "4be13f8c832bf26e47032183",
  //       credential: "vIAZTGWsF/apHqZU",
  //     },
  //     {
  //       urls: "turns:global.relay.metered.ca:443?transport=tcp",
  //       username: "4be13f8c832bf26e47032183",
  //       credential: "vIAZTGWsF/apHqZU",
  //     },
  //   ],
  //   iceCandidatePoolSize: 10,
  // };

  // const configuration: RTCConfiguration = {
  //   iceServers: [
  //     {
  //       urls: "stun:stun.relay.metered.ca:80",
  //     },
  //     {
  //       urls: "turn:global.relay.metered.ca:80",
  //       username: "4be13f8c832bf26e47032183",
  //       credential: "vIAZTGWsF/apHqZU",
  //     },
  //     {
  //       urls: "turn:global.relay.metered.ca:80?transport=tcp",
  //       username: "4be13f8c832bf26e47032183",
  //       credential: "vIAZTGWsF/apHqZU",
  //     },
  //     {
  //       urls: "turn:global.relay.metered.ca:443",
  //       username: "4be13f8c832bf26e47032183",
  //       credential: "vIAZTGWsF/apHqZU",
  //     },
  //     {
  //       urls: "turns:global.relay.metered.ca:443?transport=tcp",
  //       username: "4be13f8c832bf26e47032183",
  //       credential: "vIAZTGWsF/apHqZU",
  //     },
  //   ],
  // };
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

  const createPeerConnection = async () => {
    peerConnection = new RTCPeerConnection(configuration);
    if (!remoteStream) {
      remoteStream = new MediaStream();
    }

    localStream?.getTracks().forEach((track) => {
      peerConnection.addTrack(track, localStream);
    });

    peerConnection.ontrack = (event) => {
      event.streams[0].getTracks().forEach((track) => {
        remoteStream?.addTrack(track);
      });
      setVideosStream((prev) => [
        ...prev,
        <StreamVideo
          key={"remoteStream"}
          id={"remoteStream"}
          stream={remoteStream!}
        />,
      ]);
    };

    peerConnection.onicecandidate = async (event) => {
      if (event.candidate) {
        const newIceCandidate = new RTCIceCandidate(event.candidate);
        socket.emit("ice:candidate", {
          roomId: roomId,
          candidate: newIceCandidate,
        });
      }
    };

    peerConnection.addEventListener("icegatheringstatechange", (event) => {
      console.log(event);
      console.log(
        `ICE gathering state changed: ${peerConnection?.iceGatheringState}`
      );
    });

    peerConnection.addEventListener("signalingstatechange", (event) => {
      console.log(event);
      console.log(peerConnection.signalingState);
    });

    peerConnection?.addEventListener("connectionstatechange", (event) => {
      console.log(event);
      console.log(
        `Connection state change: ${peerConnection?.connectionState}`
      );
    });

    peerConnection?.addEventListener("iceconnectionstatechange ", (event) => {
      console.log(event);
      console.log(
        `ICE connection state change: ${peerConnection?.iceConnectionState}`
      );
    });
  };

  const createOffer = async () => {
    await createPeerConnection();
    const offer = await peerConnection?.createOffer();
    await peerConnection?.setLocalDescription(offer);
    socket.emit(
      "create:meeting",
      {
        offer: {
          type: offer?.type,
          sdp: offer?.sdp,
        },
      },
      async (roomRef: ICE) => {
        setRoomId(roomRef._roomId);
      }
    );
    console.log(peerConnection);
  };

  const createAnswer = async (roomRef: ICE) => {
    await createPeerConnection();
    await peerConnection?.setRemoteDescription(roomRef.offer);
    const answer = await peerConnection?.createAnswer();
    await peerConnection?.setLocalDescription(answer);
    socket.emit("join:meetingSuccess", {
      _roomId: roomRef._roomId,
      offer: roomRef.offer,
      answer: answer,
    });
    setRoomId(roomRef._roomId);
    console.log(peerConnection);
  };

  const createRoom = async () => {
    try {
      await init();
      await createOffer();
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

  useEffect(() => {
    const handleUserJoinRoom = async (data: ICE) => {
      console.log(peerConnection);
      console.log(data);
      console.log(me);
      if (me !== data._userId) {
        alert("sdsds");
        if (!peerConnection?.currentRemoteDescription && data.answer) {
          console.log("Set remote description: ", data.answer);
          const answer = new RTCSessionDescription(data.answer);
          await peerConnection?.setRemoteDescription(answer);
        }
      }
      console.log(peerConnection);
    };

    const handleNewCandidate = (data: { candidate: RTCIceCandidateInit }) => {
      const candidate = new RTCIceCandidate(data.candidate);
      peerConnection
        ?.addIceCandidate(candidate)
        .then(() => {
          console.log("ICE candidate added successfully");
        })
        .catch((error) => {
          console.error("Error adding ICE candidate:", error);
        });
    };

    socket.on("ice_candidate", handleNewCandidate);
    socket.on("join_room_success", handleUserJoinRoom);

    return () => {
      socket.off("ice_candidate", handleNewCandidate);
      socket.off("join_room_success", handleUserJoinRoom);
    };
  }, [me]);

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
      <div
        className="mdc-dialog"
        id="room-dialog"
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="my-dialog-title"
        aria-describedby="my-dialog-content"
      >
        <div className="mdc-dialog__container">
          <div className="mdc-dialog__surface">
            <h2 className="mdc-dialog__title" id="my-dialog-title">
              Join room
            </h2>
            <Form
              formVariant="absolute right-5 top-1/4 items-center flex flex-row md:right-1/4"
              inputVariant="w-full px-3 py-2 border focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-e-full top-10"
              input={[
                {
                  types: "text",
                  id: "content",
                  placeholder: "Search...",
                  wrapInputVariant: "w-full pr-[5rem]",
                },
              ]}
              id="chat-box"
              buttonLabel="Upload cover..."
              buttonVariant="rounded-full text-white bg-red-600"
              onSubmitSuccess={joinRoomById}
              onSubmitFail={() => {}}
            />
            <footer className="mdc-dialog__actions">
              <button
                type="button"
                className="mdc-button mdc-dialog__button"
                data-mdc-dialog-action="no"
              >
                <span className="mdc-button__label">Cancel</span>
              </button>
              <button
                id="confirmJoinBtn"
                type="button"
                className="mdc-button mdc-dialog__button"
                data-mdc-dialog-action="yes"
              >
                <span className="mdc-button__label">Join</span>
              </button>
            </footer>
          </div>
        </div>
        <span ref={roomIdRef}></span>
      </div>
    </div>
  );
};

export default Meeting;

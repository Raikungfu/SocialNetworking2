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
  const [localStream, setLocalStream] = useState<MediaStream>();
  const [remoteStream, setRemoteStream] = useState<MediaStream>();
  const [roomId, setRoomId] = useState<string>("");

  const roomIdRef = useRef<HTMLSpanElement>(null);

  const configuration: RTCConfiguration = {
    iceServers: [
      { urls: "stun:stun.relay.metered.ca:80" },
      {
        urls: "turn:global.relay.metered.ca:80",
        username: "4be13f8c832bf26e47032183",
        credential: "vIAZTGWsF/apHqZU",
      },
      {
        urls: "turn:global.relay.metered.ca:80?transport=tcp",
        username: "4be13f8c832bf26e47032183",
        credential: "vIAZTGWsF/apHqZU",
      },
      {
        urls: "turn:global.relay.metered.ca:443",
        username: "4be13f8c832bf26e47032183",
        credential: "vIAZTGWsF/apHqZU",
      },
      {
        urls: "turns:global.relay.metered.ca:443?transport=tcp",
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

  useEffect(() => {
    if (localStream) {
      setVideosStream([
        <StreamVideo
          key={"localStream"}
          id={"localStream"}
          stream={localStream!}
        />,
      ]);
    }
  }, [localStream]);

  useEffect(() => {
    if (remoteStream) {
      setVideosStream((prev) => [
        ...prev,
        <StreamVideo
          key={"remoteStream"}
          id={"remoteStream"}
          stream={remoteStream!}
        />,
      ]);
    }
  }, [remoteStream]);

  function sendIceCandidate(candidate: RTCIceCandidateInit) {
    alert("Sending candidate");
    socket.emit("ice:candidate", { candidate });
  }

  const init = async () => {
    peerConnection = new RTCPeerConnection(configuration);
    if (!localStream) {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      setLocalStream(stream);
    }
  };

  const createOffer = async () => {
    const offer = await peerConnection?.createOffer();
    await peerConnection?.setLocalDescription(offer);
    return {
      offer: {
        type: offer?.type,
        sdp: offer?.sdp,
      },
    };
  };

  const handleJoinRoom = async () => {
    if (!remoteStream) {
      setRemoteStream(new MediaStream());
    }

    localStream?.getTracks().forEach((track) => {
      peerConnection.addTrack(track, localStream);
    });

    peerConnection?.addEventListener("track", async (event) => {
      if (event.streams && event.streams.length > 0) {
        event.streams[0].getTracks().forEach((track) => {
          remoteStream?.addTrack(track);
        });
      }
    });

    peerConnection?.addEventListener(
      "icecandidate",
      (event: RTCPeerConnectionIceEvent) => {
        if (event.candidate) {
          const newIceCandidate = new RTCIceCandidate(event.candidate);
          console.log("ICE candidate:", newIceCandidate);
          sendIceCandidate(newIceCandidate);
        }
      }
    );
  };

  const createAnswer = async (roomRef: ICE) => {
    if (!peerConnection) peerConnection = new RTCPeerConnection(configuration);
    await peerConnection?.setRemoteDescription(
      new RTCSessionDescription(roomRef.offer)
    );
    const answer = await peerConnection?.createAnswer();
    await peerConnection?.setLocalDescription(answer);

    return {
      offer: peerConnection.currentLocalDescription,
      answer: peerConnection.currentRemoteDescription,
    };
  };

  const createRoom = async () => {
    try {
      await registerPeerConnectionListeners();
      console.log(peerConnection);
      const roomWithOffer = await createOffer();
      socket.emit(
        "create:meeting",
        {
          offer: roomWithOffer.offer,
        },
        (roomRef: ICE) => {
          setRoomId(roomRef._roomId);
        }
      );
    } catch (error) {
      console.error("Error creating room:", error);
    }
  };

  const joinRoomById = async (room: IndividualSendMessage) => {
    await registerPeerConnectionListeners();
    console.log(peerConnection);
    try {
      socket.emit(
        "join:meeting",
        {
          roomId: room.content,
        },
        async (roomRef: ICE) => {
          if (roomRef._roomId) {
            const dataUpdate = await createAnswer(roomRef);
            socket.emit("join:meetingSuccess", {
              _roomId: roomRef._roomId,
              offer: dataUpdate.offer,
              answer: dataUpdate.answer,
            });
            setRoomId(roomRef._roomId);
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
    if (me !== data._userId) {
      if (!peerConnection?.currentRemoteDescription && data.answer) {
        console.log("Set remote description: ", data.answer);
        const answer = new RTCSessionDescription(data.answer);
        await peerConnection?.setRemoteDescription(answer);
      }
    }
    await handleJoinRoom();
    console.log(await peerConnection);
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

  const registerPeerConnectionListeners = async () => {
    await init();
    peerConnection?.addEventListener("icegatheringstatechange", () => {
      console.log(
        `ICE gathering state changed: ${peerConnection?.iceGatheringState}`
      );
    });

    peerConnection?.addEventListener("connectionstatechange", () => {
      console.log(
        `Connection state change: ${peerConnection?.connectionState}`
      );
    });

    peerConnection?.addEventListener("signalingstatechange", () => {
      console.log(`Signaling state change: ${peerConnection?.signalingState}`);
    });

    peerConnection?.addEventListener("iceconnectionstatechange ", () => {
      console.log(
        `ICE connection state change: ${peerConnection?.iceConnectionState}`
      );
    });
  };

  socket.on("ice_candidate", handleNewCandidate);
  socket.on("join_room_success", handleUserJoinRoom);

  useEffect(() => {
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

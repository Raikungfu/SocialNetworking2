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
  const roomIdRef = useRef<HTMLSpanElement>(null);
  const configuration = {
    iceServers: [
      {
        urls: [
          "stun:stun1.l.google.com:19302",
          "stun:stun2.l.google.com:19302",
        ],
      },
    ],
    iceCandidatePoolSize: 10,
  };

  let peerConnection: RTCPeerConnection | null = null;
  let localStream: MediaStream | null = null;
  let remoteStream: MediaStream | null = null;

  useEffect(() => {
    const handleUserJoinRoom = (data: ICE) => {
      if (me !== data._userId) {
        peerConnection?.setRemoteDescription(data.answer);
      }
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
  }, []);

  function sendIceCandidate(candidate: RTCIceCandidateInit) {
    socket.emit("ice:candidate", { candidate });
  }

  const init = async () => {
    console.log("Create PeerConnection with configuration: ", configuration);
    peerConnection = new RTCPeerConnection(configuration);

    if (!localStream) {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      localStream = stream;
    }

    setVideosStream((prev) => [
      <StreamVideo
        key={"localStream"}
        id={"localStream"}
        stream={localStream!}
      />,
      ...prev,
    ]);
  };

  const createOffer = async () => {
    registerPeerConnectionListeners();
    init();

    const offer = await peerConnection?.createOffer();
    await peerConnection?.setLocalDescription(offer);

    const roomWithOffer = {
      offer: {
        type: offer?.type,
        sdp: offer?.sdp,
      },
    };

    await socket.emit(
      "create:meeting",
      {
        offer: roomWithOffer.offer,
      },
      async (roomRef: ICE) => {
        const roomId = roomRef._roomId;
        if (roomIdRef.current) {
          roomIdRef.current.textContent = "RoomId: " + roomId;
        }

        localStream?.getTracks().forEach((track) => {
          if (localStream) peerConnection?.addTrack(track, localStream);
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

        handleListenNewUser();
        console.log(peerConnection);
      }
    );
  };

  const handleListenNewUser = () => {
    remoteStream = new MediaStream();
    peerConnection?.addEventListener("track", async (event) => {
      [remoteStream] = event.streams;
      setVideosStream((prev) => [
        <StreamVideo
          key={"remoteStream"}
          id={"remoteStream"}
          stream={remoteStream!}
        />,
        ...prev,
      ]);
    });
  };

  const createAnswer = async (roomRef: ICE) => {
    init();
    if (!peerConnection) peerConnection = new RTCPeerConnection(configuration);
    await peerConnection?.setRemoteDescription(
      new RTCSessionDescription(roomRef.offer)
    );
    const answer = await peerConnection?.createAnswer();
    await peerConnection?.setLocalDescription(answer);

    const roomWithAnswer = {
      answer: {
        type: answer?.type,
        sdp: answer?.sdp,
      },
    };
    console.log(peerConnection);
    socket.emit("join:meetingSuccess", {
      roomId: roomRef._roomId,
      answer: roomWithAnswer.answer,
    });

    localStream?.getTracks().forEach((track) => {
      if (localStream) peerConnection?.addTrack(track, localStream);
    });

    handleListenNewUser();
  };

  const createRoom = async () => {
    try {
      init();
      createOffer();
    } catch (error) {
      console.error("Error creating room:", error);
    }
  };

  const joinRoomById = async (roomId: IndividualSendMessage) => {
    registerPeerConnectionListeners();
    try {
      await socket.emit(
        "join:meeting",
        {
          roomId: roomId.content,
        },
        async (roomRef: ICE) => {
          if (roomRef) {
            console.log("Joined room", roomRef);
            createAnswer(roomRef);
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

  function registerPeerConnectionListeners() {
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
  }

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

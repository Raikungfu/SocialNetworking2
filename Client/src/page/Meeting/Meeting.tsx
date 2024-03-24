import { useEffect, useRef, useState } from "react";
import Button from "../../component/Layout/Button";
import StreamVideo from "../../component/Layout/StreamVideo";
import Form from "../../component/Layout/Form/FormInputWithAttachFile";
import { IndividualSendMessage } from "../../component/Layout/Form/FormInputWithAttachFile/types";
import { useLocation } from "react-router-dom";
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
  _id: string;
  offer: {
    type: RTCSdpType;
    sdp: string;
  };
  answer?: {
    type: RTCSdpType;
    sdp: string;
  };
}

const Meeting = () => {
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
  const loc = useLocation();

  useEffect(() => {
    const handleUserJoinRoom = (data: ICE) => {
      console.log(data);
      peerConnection?.setRemoteDescription(data.offer);
      peerConnection?.addEventListener("track", async (event) => {
        const [remoteStream] = event.streams;
        setVideosStream((prev) => [
          <StreamVideo
            key={data._id}
            id={data._id}
            stream={remoteStream!}
            newStream={async () => {
              const newStream = await navigator.mediaDevices.getUserMedia({
                video: true,
                audio: true,
              });
              return newStream;
            }}
          />,
          ...prev,
        ]);
      });
    };

    socket.on("join_room_success", handleUserJoinRoom);
    return () => {
      socket.off("join_room_success", handleUserJoinRoom);
    };
  }, [loc.pathname]);

  const createRoom = async () => {
    try {
      console.log("Create PeerConnection with configuration: ", configuration);

      peerConnection = new RTCPeerConnection(configuration);

      const offer = await peerConnection.createOffer();
      await peerConnection.setLocalDescription(offer);

      const roomWithOffer = {
        offer: {
          type: offer.type,
          sdp: offer.sdp,
        },
      };

      registerPeerConnectionListeners();
      await socket.emit(
        "create:meeting",
        {
          offer: roomWithOffer.offer,
        },
        async (roomRef: ICE) => {
          const roomId = roomRef._id;
          if (roomIdRef.current) {
            roomIdRef.current.textContent = "RoomId: " + roomId;
          }

          const stream = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true,
          });

          localStream = stream;

          setVideosStream((prev) => [
            <StreamVideo
              key={roomRef._id}
              id={roomRef._id}
              stream={localStream!}
              newStream={async () => {
                const newStream = await navigator.mediaDevices.getUserMedia({
                  video: true,
                  audio: true,
                });
                return newStream;
              }}
            />,
            ...prev,
          ]);

          localStream?.getTracks().forEach((track) => {
            if (localStream) peerConnection?.addTrack(track, localStream);
          });

          peerConnection?.addEventListener("track", (event) => {
            console.log("Got remote track:", event.streams[0]);
            event.streams[0].getTracks().forEach((track) => {
              console.log("Add a track to the remoteStream:", track);
              remoteStream?.addTrack(track);
            });
          });
          console.log(peerConnection);
        }
      );
    } catch (error) {
      console.error("Error creating room:", error);
    }
  };

  const joinRoomById = async (roomId: IndividualSendMessage) => {
    try {
      console.log(roomId);
      await socket.emit(
        "join:meeting",
        {
          roomId: roomId.content,
        },
        async (roomRef: ICE) => {
          if (roomRef) {
            console.log("Joined room", roomRef);
            if (!peerConnection)
              peerConnection = new RTCPeerConnection(configuration);
            const offer = roomRef.offer;
            await peerConnection?.setRemoteDescription(offer);
            const answer = await peerConnection?.createAnswer();
            await peerConnection?.setLocalDescription(answer);

            const roomWithAnswer = {
              offer: {
                type: answer?.type,
                sdp: answer?.sdp,
              },
            };
            console.log(peerConnection);
            socket.emit("join:meetingSuccess", {
              roomId: roomId.content,
              offer: roomWithAnswer.offer,
            });
            const stream = await navigator.mediaDevices.getUserMedia({
              video: true,
              audio: true,
            });

            localStream = stream;

            setVideosStream((prev) => [
              <StreamVideo
                key={roomRef._id}
                id={roomRef._id}
                stream={localStream!}
                newStream={async () => {
                  const newStream = await navigator.mediaDevices.getUserMedia({
                    video: true,
                    audio: true,
                  });
                  return newStream;
                }}
              />,
              ...prev,
            ]);

            peerConnection?.addEventListener("track", async (event) => {
              const [remoteStream] = event.streams;
              setVideosStream((prev) => [
                <StreamVideo
                  key={"remoteStream"}
                  id={"remoteStream"}
                  stream={remoteStream!}
                  newStream={async () => {
                    const newStream = await navigator.mediaDevices.getUserMedia(
                      {
                        video: true,
                        audio: true,
                      }
                    );
                    return newStream;
                  }}
                />,
                ...prev,
              ]);
            });
          } else {
            if (roomIdRef.current)
              roomIdRef.current.textContent = "Not found!!!";
          }
        }
      );

      // if (roomRef) {
      //   console.log(
      //     "Create PeerConnection with configuration: ",
      //     configuration
      //   );
      //   peerConnection = new RTCPeerConnection(configuration);

      //   registerPeerConnectionListeners();
      //   localStream?.getTracks().forEach((track) => {
      //     peerConnection?.addTrack(track, localStream!);
      //   });

      //   setVideosStream((prev) => [
      //     <StreamVideo
      //       id={localStream?.id}
      //       stream={localStream!}
      //       newStream={async () => {
      //         const newStream = await navigator.mediaDevices.getUserMedia({
      //           video: true,
      //           audio: true,
      //         });
      //         return newStream;
      //       }}
      //     />,
      //     ...prev,
      //   ]);

      // peerConnection.addEventListener("icecandidate", (event) => {
      //   console.log(event.candidate);
      //   if (event.candidate) {
      //     const newIceCandidate = new RTCIceCandidate(event.candidate);
      //     // Gửi ICE candidate đến peer đối tác

      //     console.log("ICE candidate:", newIceCandidate);
      //     // sendIceCandidate(newIceCandidate);
      //   }
      // });

      //     remoteStream = new MediaStream();

      //     peerConnection.onicecandidate = (event) => {
      //       if (event.candidate) {
      //         socket.emit("ice-candidate", { candidate: event.candidate });
      //       }
      //     };

      //     // Lắng nghe ICE candidate từ đối tác
      //     socket.on("ice-candidate", (data) => {
      //       const candidate = new RTCIceCandidate(data.candidate);
      //       peerConnection
      //         ?.addIceCandidate(candidate)
      //         .then(() => {
      //           console.log("ICE candidate added successfully");
      //         })
      //         .catch((error) => {
      //           console.error("Error adding ICE candidate:", error);
      //         });
      //     });

      //     peerConnection.addEventListener("track", async (event) => {
      //       console.log("Got remote track:", event.streams[0]);
      //       event.streams[0].getTracks().forEach((track) => {
      //         console.log("Add a track to the remoteStream:", track);
      //         remoteStream?.addTrack(track);
      //       });

      //       if (roomRef.offer) {
      //         const offer = new RTCSessionDescription(roomRef.offer);
      //         await peerConnection?.setRemoteDescription(offer);
      //         console.log("Remote description set:", offer);
      //       } else {
      //         console.error("No offer found in roomRef:", roomRef);
      //       }

      //       setVideosStream((prev) => [
      //         <StreamVideo
      //           id={remoteStream?.id}
      //           stream={remoteStream!}
      //           newStream={async () => {
      //             const newStream = await navigator.mediaDevices.getUserMedia({
      //               video: true,
      //               audio: true,
      //             });
      //             return newStream;
      //           }}
      //         />,
      //         ...prev,
      //       ]);
      //     });
      //     console.log(peerConnection);
      //   }
    } catch (error) {
      console.error("Error joining room:", error);
    }
  };

  const openUserMedia = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      localStream = stream;
      remoteStream = new MediaStream();

      setVideosStream((prev) => [
        <StreamVideo
          id={localStream?.id}
          stream={stream}
          newStream={async () => {
            const newStream = await navigator.mediaDevices.getUserMedia({
              video: true,
              audio: true,
            });
            return newStream;
          }}
        />,
        ...prev,
      ]);
    } catch (error) {
      console.error("Error opening user media:", error);
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
          label="Open camera & microphone"
          onClick={openUserMedia}
        />
        <Button
          id="openCamera"
          className="p-2 bg-red-500 text-white rounded-lg"
          label="Create new Room"
          onClick={createRoom}
        />
        {/* <Button
          id="openCamera"
          className="p-2 bg-red-500 text-white rounded-lg"
          label="Join Exist Room"
          onClick={createRoom}
        />
        <Button
          id="openCamera"
          className="p-2 bg-red-500 text-white rounded-lg"
          label="Close Meeting"
          onClick={createRoom}
        /> */}
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

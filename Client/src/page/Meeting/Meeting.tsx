import { useEffect, useRef, useState } from "react";
import Button from "../../component/Layout/Button";
import StreamVideo from "../../component/Layout/StreamVideo";
import Form from "../../component/Layout/Form/FormInputWithAttachFile";
import { IndividualSendMessage } from "../../component/Layout/Form/FormInputWithAttachFile/types";
import socket from "../../config/socketIO";

export interface ICE {
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

export interface peerC {
  _userId?: string;
  _roomId?: string;
  peerConnection: RTCPeerConnection;
  // listCandidates: RTCIceCandidateInit[];
}

const Meeting = () => {
  const [videosStream, setVideosStream] = useState<JSX.Element[]>([]);
  let localMediaStream: MediaStream;
  const [roomId, setRoomId] = useState<string>("");
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
    iceCandidatePoolSize: 10,
  };

  useEffect(() => {
    const init = async () => {
      if (!localMediaStream) {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        localMediaStream = stream;
        setVideosStream([
          <StreamVideo
            key={"localStream"}
            userId={"localStream"}
            // mediaStream={localMediaStream}
            displayStream={stream}
          />,
        ]);
      }
    };

    const createPeerConnection = async (
      roomId: string,
      userId: string,
      peer: peerC
    ) => {
      const remoteMediaStream = new MediaStream();
      localMediaStream?.getTracks().forEach((track) => {
        peer.peerConnection?.addTrack(track, localMediaStream);
      });

      if (peer && peer.peerConnection) {
        peer.peerConnection.ontrack = (event) => {
          event.streams[0].getTracks().forEach((track) => {
            remoteMediaStream.addTrack(track);
          });
        };
      }

      if (peer.peerConnection) {
        peer.peerConnection.onicecandidate = async (event) => {
          if (event.candidate) {
            socket.emit("ice:candidate", {
              _roomId: roomId,
              _userId: userId,
              candidate: new RTCIceCandidate(event.candidate),
            });
          }
        };
      }

      setVideosStream((prev) => [
        ...prev,
        <StreamVideo
          key={"remoteStream"}
          userId={userId}
          displayStream={remoteMediaStream}
          peerConnection={peer}
        />,
      ]);
    };

    const handleUserJoinRoom = async ({
      _userId,
    }: {
      _userId: string;
      _roomId: string;
    }) => {
      if (!localMediaStream) {
        await init();
      }
      const peerConnection = new RTCPeerConnection(configuration);
      await createOffer(_userId, roomId, {
        peerConnection: peerConnection,
        _roomId: roomId,
        _userId: _userId,
      });
    };

    const handleGetOffer = async (roomRef: ICE) => {
      if (!localMediaStream) {
        await init();
      }
      const peerConnection = new RTCPeerConnection(configuration);
      await createAnswer(roomRef, {
        peerConnection: peerConnection,
        _roomId: roomRef._roomId,
        _userId: roomRef._userId,
      });
    };

    const createOffer = async (
      _userId: string,
      _roomId: string,
      peer: peerC
    ) => {
      await createPeerConnection(_roomId, _userId, peer);
      const offer = await peer.peerConnection?.createOffer();
      await peer.peerConnection?.setLocalDescription(offer);
      socket.emit("send-offer", {
        _userId: _userId,
        _roomId: _roomId,
        offer: offer,
      });
    };

    const createAnswer = async (roomRef: ICE, peer: peerC) => {
      await createPeerConnection(roomRef._roomId, roomRef._userId, peer);
      try {
        peer.peerConnection?.setRemoteDescription(roomRef.offer);
        const answer = await peer.peerConnection?.createAnswer();
        await peer.peerConnection?.setLocalDescription(answer);
        socket.emit("send-answer", {
          _roomId: roomRef._roomId,
          _userId: roomRef._userId,
          answer: answer,
        });
        setRoomId(roomRef._roomId);
      } catch (err) {
        console.log(err);
      }
    };

    socket.on("send_offer", handleGetOffer);
    socket.on("new_user_join", handleUserJoinRoom);
    return () => {
      socket.off("send_offer", handleGetOffer);
      socket.off("new_user_join", handleUserJoinRoom);
    };
  });

  useEffect(() => {
    if (roomIdRef.current) {
      roomIdRef.current.style.display = "color:green";
      roomIdRef.current.textContent = "Current room: " + roomId;
    }
  }, [roomId]);

  const createRoom = async () => {
    try {
      socket.emit(
        "create:meeting",
        {},
        async (data: { _roomId: string; _userId: string }) => {
          setRoomId(data._roomId);
        }
      );
    } catch (error) {
      console.error("Error creating room:", error);
    }
  };

  const joinRoomById = async (room: IndividualSendMessage) => {
    try {
      socket.emit(
        "join:meeting",
        {
          _roomId: room.content,
        },
        async (roomRef: ICE) => {
          if (roomRef._roomId) {
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

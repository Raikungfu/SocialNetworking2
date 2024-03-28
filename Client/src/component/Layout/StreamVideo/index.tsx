import { useEffect, useState } from "react";
import { ICE, peerC } from "../../../page/Meeting/Meeting";
import socket from "../../../config/socketIO";
import StreamVideo from "./StreamVideo";
import { configuration } from "../../../type/constant";

const ListStreamVideo: React.FC<{
  idKey: string;
  userId: string;
  localMediaStream: MediaStream;
}> = (props) => {
  const [videosStream, setVideosStream] = useState<JSX.Element[]>([]);

  useEffect(() => {
    setVideosStream([
      <StreamVideo
        key={"localStream"}
        userId={"localStream"}
        localMediaStream={props.localMediaStream}
        idKey={"localStream"}
      />,
    ]);
    const handleUserJoinRoom = async ({
      _userId,
      _roomId,
    }: {
      _userId: string;
      _roomId: string;
    }) => {
      const peerConnection = new RTCPeerConnection(configuration);
      await createOffer(_userId, _roomId, {
        peerConnection: peerConnection,
        _roomId: _roomId,
        _userId: _userId,
      });
    };

    const handleGetOffer = async (roomRef: ICE) => {
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
      createPeerConnection(_roomId, _userId, peer);
      const offer = await peer.peerConnection?.createOffer();
      await peer.peerConnection?.setLocalDescription(offer);
      socket.emit("send-offer", {
        _userId: _userId,
        _roomId: _roomId,
        offer: offer,
      });
    };

    const createAnswer = async (roomRef: ICE, peer: peerC) => {
      try {
        console.log("createAnswer");
        createPeerConnection(roomRef._roomId, roomRef._userId, peer);
        peer.peerConnection?.setRemoteDescription(roomRef.offer);
        const answer = await peer.peerConnection?.createAnswer();
        await peer.peerConnection?.setLocalDescription(answer);
        console.log(peer.peerConnection);
        socket.emit("send-answer", {
          _roomId: roomRef._roomId,
          _userId: roomRef._userId,
          answer: answer,
        });
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
  }, []);

  const createPeerConnection = async (
    roomId: string,
    userId: string,
    peer: peerC
  ) => {
    const remoteMediaStream = new MediaStream();
    props.localMediaStream.getTracks().forEach((track) => {
      props.localMediaStream &&
        peer.peerConnection?.addTrack(track, props.localMediaStream);
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
        key={"remote-stream-" + userId}
        userId={userId}
        remoteMediaStream={remoteMediaStream}
        peerConnection={peer}
        idKey={"remoteStream"}
      />,
    ]);
  };

  return <div>{videosStream.map((video) => video)}</div>;
};

export default ListStreamVideo;

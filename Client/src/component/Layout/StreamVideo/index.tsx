import { useEffect, useState } from "react";
import { ICE, peerC } from "../../../page/Meeting/Meeting";
import socket from "../../../config/socketIO";
import StreamVideo from "./StreamVideo";
import { configuration } from "../../../type/constant";
import VideoStream from "../MediaLayout/VideoStream";

const ListStreamVideo: React.FC<{
  idKey: string;
  userId: string;
  localMediaStream: MediaStream;
}> = (props) => {
  const [videosStream, setVideosStream] = useState<JSX.Element[]>([]);
  const listPeerConnections: RTCPeerConnection[] = [];

  useEffect(() => {
    setVideosStream([
      <StreamVideo
        key={"localStream"}
        userId={"localStream"}
        localMediaStream={props.localMediaStream}
        idKey={"localStream"}
        name={""}
        handleGetListPeer={() => {
          return listPeerConnections;
        }}
      />,
    ]);
    const handleUserJoinRoom = async ({
      _userId,
      _roomId,
      _userName,
    }: {
      _userId: string;
      _roomId: string;
      _userName: string;
    }) => {
      const peerConnection = new RTCPeerConnection(configuration);
      await createOffer(
        _userId,
        _roomId,
        {
          peerConnection: peerConnection,
          _roomId: _roomId,
          _userId: _userId,
        },
        _userName
      );
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
      peer: peerC,
      _userName: string
    ) => {
      createPeerConnection(_roomId, _userId, peer, _userName);
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
        createPeerConnection(
          roomRef._roomId,
          roomRef._userId,
          peer,
          roomRef._userName || "User"
        );
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
      props.localMediaStream.getTracks().forEach(function (track) {
        track.stop();
      });
    };
  }, []);

  const createPeerConnection = async (
    roomId: string,
    userId: string,
    peer: peerC,
    name: string
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
    listPeerConnections.push(peer.peerConnection);
    setVideosStream((prev) => [
      ...prev,
      <StreamVideo
        key={"remote-stream-" + userId}
        userId={userId}
        remoteMediaStream={remoteMediaStream}
        peerConnection={peer}
        idKey={"remoteStream"}
        name={name}
      />,
    ]);
  };

  return <VideoStream childrencomp={videosStream} />;
};

export default ListStreamVideo;

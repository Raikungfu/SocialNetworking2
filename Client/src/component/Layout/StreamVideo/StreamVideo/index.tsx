import { useEffect, useRef, useState } from "react";
import VideoCamOffIcon from "@mui/icons-material/VideocamOff";
import VideoCamOnIcon from "@mui/icons-material/Videocam";
import MicIcon from "@mui/icons-material/KeyboardVoice";
import MicOffIcon from "@mui/icons-material/MicOff";
import CameraIcon from "@mui/icons-material/Camera";
import ScreenShareIcon from "@mui/icons-material/ScreenShare";
import { ICE, peerC } from "../../../../page/Meeting/Meeting";
import socket from "../../../../config/socketIO";
import Button from "../../Button";
import "./style.scss";

const StreamVideo: React.FC<{
  name?: string;
  idKey: string;
  userId: string;
  peerConnection?: peerC;
  localMediaStream?: MediaStream;
  remoteMediaStream?: MediaStream;
  handleGetListPeer?: () => RTCPeerConnection[];
}> = (props) => {
  const [isCamOpen, setIsCamOpen] = useState<boolean>(true);
  const [isMicOpen, setIsMicOpen] = useState<boolean>(true);
  const [isMediaStream, setIsMediaStream] = useState<boolean>(true);
  const [mediaStream, setMediaStream] = useState<MediaStream>();
  const videoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    socket.on("ice_candidate", handleNewCandidate);
    socket.on("send_answer", handleGetAnswer);
    return () => {
      socket.off("ice_candidate", handleNewCandidate);
      socket.off("send_answer", handleGetAnswer);
    };
  });
  const handleNewCandidate = (data: {
    roomId: string;
    _userId: string;
    candidate: RTCIceCandidate;
  }) => {
    props.peerConnection?.peerConnection
      .addIceCandidate(data.candidate)
      .catch((e) => {
        console.log(`Failure during addIceCandidate(): ${e.name}`);
      });
  };

  props.peerConnection?.peerConnection?.addEventListener(
    "icegatheringstatechange",
    () => {
      console.log(
        `ICE gathering state changed: ${props.peerConnection?.peerConnection?.iceGatheringState}`
      );
      console.log(props.peerConnection?.peerConnection);
    }
  );

  props.peerConnection?.peerConnection?.addEventListener(
    "signalingstatechange",
    () => {
      console.log(props.peerConnection?.peerConnection.signalingState);
    }
  );

  props.peerConnection?.peerConnection?.addEventListener(
    "connectionstatechange",
    () => {
      console.log(
        `Connection state change: ${props.peerConnection?.peerConnection?.connectionState}`
      );
      console.log(props.peerConnection?.peerConnection);
    }
  );

  props.peerConnection?.peerConnection?.addEventListener(
    "iceconnectionstatechange ",
    () => {
      console.log(
        `ICE connection state change: ${props.peerConnection?.peerConnection?.iceConnectionState}`
      );
      console.log(props.peerConnection?.peerConnection);
    }
  );

  const handleGetAnswer = async (data: ICE) => {
    try {
      if (
        !props.peerConnection?.peerConnection?.remoteDescription &&
        data.answer
      ) {
        console.log(data.answer);
        await props.peerConnection?.peerConnection?.setRemoteDescription(
          data.answer
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const handleOpenVideoStream = async () => {
      if (videoRef.current) {
        videoRef.current.srcObject =
          mediaStream ||
          props.localMediaStream ||
          props.remoteMediaStream ||
          new MediaStream();
      }
      if (mediaStream === undefined) {
        setMediaStream(
          props.localMediaStream || props.remoteMediaStream || new MediaStream()
        );
      }
    };
    handleOpenVideoStream();
  }, [isMediaStream]);

  const handleOpenCamera = async () => {
    const videoTracks = mediaStream?.getVideoTracks();
    const videoTrack = videoTracks?.find(
      (track) => track.id === videoTracks[0].id
    );
    if (videoRef.current && videoTrack) {
      if (videoTrack.enabled === true) {
        videoTrack.enabled = false;
        setIsCamOpen(false);
      } else {
        videoTrack.enabled = true;
        setIsCamOpen(true);
      }
    }
  };

  const handleOpenMic = async () => {
    const audioTracks = mediaStream?.getAudioTracks();
    const audioTrack = audioTracks?.find(
      (track) => track.id === audioTracks[0].id
    );
    if (videoRef.current && audioTrack) {
      if (audioTrack.enabled === true) {
        audioTrack.enabled = false;
        setIsMicOpen(false);
      } else {
        audioTrack.enabled = true;
        setIsMicOpen(true);
      }
    } else if (!audioTrack && !isMicOpen) {
      if (videoRef.current) {
        if (props.remoteMediaStream) videoRef.current.classList.remove("muted");
        setIsMicOpen(true);
      }
    } else {
      if (videoRef.current) {
        if (props.remoteMediaStream) videoRef.current.classList.add("muted");
        setIsMicOpen(false);
      }
    }
  };

  const turnStageVideoStream = async () => {
    const listPeerConnections =
      props.handleGetListPeer && props.handleGetListPeer();
    const stageStreamVideo = isMediaStream
      ? await navigator.mediaDevices.getDisplayMedia({
          video: {
            aspectRatio: 16 / 9,
          },
          audio: true,
        })
      : await navigator.mediaDevices.getUserMedia({
          video: {
            aspectRatio: 16 / 9,
            width: { min: 720, ideal: 720, max: 1280 },
            height: { min: 480, ideal: 480, max: 720 },
          },
          audio: { echoCancellation: true },
        });
    stageStreamVideo.getTracks().forEach((track) => {
      listPeerConnections?.forEach((connection) => {
        connection.getSenders().forEach((sender) => {
          console.log(sender);
          sender.replaceTrack(track);
        });
      });
    });
    setMediaStream(stageStreamVideo);
    setIsMediaStream(!isMediaStream);
  };

  return (
    <div
      className="m-3 flex flex-col container-meeting relative w-full"
      key={`${props.userId}_key`}
    >
      <div className="absolute z-20 p-2 w-full bg-slate-200 opacity-50">
        {props.idKey === "localStream" ? "You" : props.name}
      </div>
      <video
        ref={videoRef}
        autoPlay
        muted={props.localMediaStream ? true : false}
        className="w-full videoStream object-contain"
      />
      <Button
        id="isOpenCam"
        className=" absolute bottom-5 left-5 z-20 p-1 bg-slate-200 opacity-50 rounded-lg"
        onClick={() => handleOpenCamera()}
        childrencomp={isCamOpen ? <VideoCamOnIcon /> : <VideoCamOffIcon />}
      />
      {props.idKey === "localStream" && (
        <Button
          id="isMediaOpen"
          className=" absolute bottom-5 transform translate-x-1/2 p-1 bg-slate-200 opacity-50 rounded-lg"
          onClick={() => turnStageVideoStream()}
          childrencomp={isMediaStream ? <CameraIcon /> : <ScreenShareIcon />}
          label={isMediaStream ? "Share screen" : "Share camera"}
        />
      )}

      <Button
        id="isOpenMic"
        className=" absolute bottom-5 right-5 z-20 p-1 bg-slate-200 opacity-50 rounded-lg"
        onClick={() => handleOpenMic()}
        childrencomp={isMicOpen ? <MicIcon /> : <MicOffIcon />}
      />
    </div>
  );
};

export default StreamVideo;

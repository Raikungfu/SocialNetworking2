import { useEffect, useRef, useState } from "react";
import Button from "../Button";
import VideocamOffIcon from "@mui/icons-material/VideocamOff";
import VideocamIcon from "@mui/icons-material/Videocam";
import MicIcon from "@mui/icons-material/KeyboardVoice";
import MicOffIcon from "@mui/icons-material/MicOff";
import CameraIcon from "@mui/icons-material/Camera";
import ScreenShareIcon from "@mui/icons-material/ScreenShare";

const StreamVideo: React.FC<{
  id?: string;
  mediaStream: MediaStream;
  displayStream?: MediaStream;
}> = (props) => {
  const [isCamOpen, setIsCamOpen] = useState<boolean>(true);
  const [isMicOpen, setIsMicOpen] = useState<boolean>(false);
  const [isMediaStream, setIsMediaStream] = useState<boolean>(true);

  const videoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const handleOpenVideoStream = async () => {
      if (videoRef.current) {
        videoRef.current.srcObject = isMediaStream
          ? props.mediaStream
          : props.displayStream || props.mediaStream;
      }
    };
    handleOpenVideoStream();
  }, [isMediaStream, props.displayStream, props.mediaStream]);

  const handleOpenCamera = async () => {
    const videoTracks = isMediaStream
      ? props.mediaStream.getVideoTracks()
      : props.displayStream?.getVideoTracks() ||
        props.mediaStream.getVideoTracks();
    const videoTrack = videoTracks.find(
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
    const audioTracks = isMediaStream
      ? props.mediaStream.getAudioTracks()
      : props.displayStream?.getAudioTracks() ||
        props.mediaStream.getAudioTracks();
    const audioTrack = audioTracks.find(
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
    }
  };

  return (
    <div className="p-10 flex flex-col w-1/2 h-1/2" key={`${props.id}_key`}>
      <video ref={videoRef} autoPlay muted className="w-full"></video>
      <div className="relative">
        <Button
          id="isOpenCam"
          className="absolute bottom-5 left-5 z-20 p-1 block bg-slate-100 opacity-50 rounded-lg"
          onClick={handleOpenCamera}
          childrencomp={isCamOpen ? <VideocamIcon /> : <VideocamOffIcon />}
        />
        <Button
          id="isOpenMic"
          className="absolute bottom-5 right-5 z-20 p-1 block bg-slate-100 opacity-50 rounded-lg"
          onClick={handleOpenMic}
          childrencomp={isMicOpen ? <MicIcon /> : <MicOffIcon />}
        />

        <Button
          id="isMediaOpen"
          className="absolute bottom-5 transform translate-x-1/2 p-1 block bg-slate-100 opacity-50 rounded-lg"
          onClick={() => setIsMediaStream(!isMediaStream)}
          childrencomp={isMediaStream ? <CameraIcon /> : <ScreenShareIcon />}
          label={isMediaStream ? "Share screen" : "Share camera"}
        />
      </div>
    </div>
  );
};

export default StreamVideo;

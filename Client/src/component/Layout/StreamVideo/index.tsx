import { useEffect, useRef, useState } from "react";
import Button from "../Button";
import VideocamOffIcon from "@mui/icons-material/VideocamOff";
import VideocamIcon from "@mui/icons-material/Videocam";
import MicIcon from "@mui/icons-material/KeyboardVoice";
import MicOffIcon from "@mui/icons-material/MicOff";

const StreamVideo: React.FC<{
  id?: string;
  stream: MediaStream;
}> = (props) => {
  const [isCamOpen, setIsCamOpen] = useState<boolean>(true);
  const [isMicOpen, setIsMicOpen] = useState<boolean>(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const handleOpenVideoStream = async () => {
      if (videoRef.current) {
        videoRef.current.srcObject = props.stream;
      }
    };
    handleOpenVideoStream();
  }, [props.stream]);

  const handleOpenCamera = async () => {
    const videoTracks = props.stream.getVideoTracks();
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
    const audioTracks = props.stream.getAudioTracks();
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
    <div className="relative" key={`${props.id}_key`}>
      <video
        ref={videoRef}
        autoPlay
        muted
        className="w-[480px] h-[360px]"
      ></video>

      <Button
        id="isOpenCam"
        className="absolute bottom-2 left-2 z-20 p-2 block bg-slate-100 opacity-50 rounded-lg"
        onClick={handleOpenCamera}
        label="Adjust camera"
        childrencomp={isCamOpen ? <VideocamIcon /> : <VideocamOffIcon />}
      />
      <Button
        id="isOpenMic"
        className="absolute bottom-2 right-2 z-20 p-2 block bg-slate-100 opacity-50 rounded-lg"
        onClick={handleOpenMic}
        childrencomp={isMicOpen ? <MicIcon /> : <MicOffIcon />}
      />
    </div>
  );
};

export default StreamVideo;

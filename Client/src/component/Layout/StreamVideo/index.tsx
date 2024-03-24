import { useEffect, useRef, useState } from "react";
import Button from "../Button";

const StreamVideo: React.FC<{
  stream: MediaStream;
  newStream: () => Promise<MediaStream>;
}> = (props) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream>(props.stream);
  useEffect(() => {
    const handleOpenVideoStream = async () => {
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    };
    handleOpenVideoStream();
  }, [stream]);

  const handleOpenCamera = async () => {
    const videoTracks = stream.getVideoTracks();
    const videoTrack = videoTracks.find(
      (track) => track.id === videoTracks[0].id
    );
    if (videoRef.current && videoTrack && videoTrack.readyState === "live") {
      // videoTrack.stop();
      videoTracks.forEach((track) => track.stop());
    } else {
      const newStream = await props.newStream();
      setStream(newStream);
    }
  };

  const handleOpenMic = () => {};
  return (
    <div className="relative">
      <video
        ref={videoRef}
        autoPlay
        muted
        controls
        className="w-[480px] h-[360px]"
      ></video>

      <Button
        id="isOpenCam"
        className="absolute bottom-2 left-2 w-20 h-10 z-20 block"
        onClick={handleOpenCamera}
        label="kkkk"
      />
      <Button
        id="isOpenMic"
        className="absolute bottom-2 left-2"
        onClick={handleOpenMic}
      />
    </div>
  );
};

export default StreamVideo;

import GroupButton from "../Layout/GroupElement/GroupButton";
import Img from "../Layout/Img";
import VideoCamOffIcon from "@mui/icons-material/VideocamOff";
import VideoCamOnIcon from "@mui/icons-material/Videocam";
import { useState } from "react";
import MicOnIcon from "@mui/icons-material/KeyboardVoice";
import MicOffIcon from "@mui/icons-material/MicOff";
import CloseIcon from "@mui/icons-material/CloseOutlined";
import { H3 } from "../Layout/Text/H3";

import avt from "../../assets/img/avtLogo.jpg";

interface ChatVideoProps {
  name?: string;
  avt?: string;
  handleCloseChat: () => void;
}

const ChatVideo: React.FC<ChatVideoProps> = (props) => {
  const [isCamOpen, setIsCamOpen] = useState<boolean>(true);
  const [isMicOpen, setIsMicOpen] = useState<boolean>(true);
  return (
    <div className="fixed inset-0 bg-gray-700">
      <div className="h-full w-full text-center flex flex-col justify-center gap-2">
        <Img
          className="w-20 h-20 self-center"
          variant="avt"
          src={props.avt || avt}
        />
        <H3
          content={"Calling.... " + props.name || ""}
          variant="italic font-light"
        />
        <GroupButton
          variant="absolute w-full bottom-60 transform justify-center flex flex-row gap-10"
          buttonClassName=" hover:bg-red-500 rounded-full bg-gray-500 p-2"
          buttons={[
            {
              id: "cam-chat-btn",
              type: "button",
              childrencomp: isCamOpen ? (
                <VideoCamOnIcon />
              ) : (
                <VideoCamOffIcon />
              ),
              onClick: () => {
                setIsCamOpen(!isCamOpen);
              },
              className: "",
            },
            {
              id: "mic-chat-btn",
              type: "button",
              childrencomp: isMicOpen ? <MicOnIcon /> : <MicOffIcon />,
              onClick: () => {
                setIsMicOpen(!isMicOpen);
              },
            },
            {
              id: "close-chat-btn",
              type: "button",
              childrencomp: <CloseIcon />,
              onClick: () => props.handleCloseChat(),
            },
          ]}
        />
      </div>
    </div>
  );
};

export default ChatVideo;

import dayjs from "dayjs";
import { CardProps } from "./types";
import Img from "../Img";
import logo from "../../../assets/img/logoAvt.jpeg";
import GroupButton from "../GroupElement/GroupButton";
import LikeIcon from "@mui/icons-material/ThumbUpOffAlt";
import CommentIcon from "@mui/icons-material/ChatOutlined";
import ShareIcon from "@mui/icons-material/SendOutlined";
import MediaLayout from "../MediaLayout";

const Card: React.FC<CardProps> = (props) => {
  return (
    <div
      className="p-4 overflow-hidden bg-white rounded-md shadow-md text-slate-500 shadow-slate-200 mb-5"
      id={props.id}
    >
      <div className="p-6">
        <header className="flex gap-4 mb-4 ">
          <a
            href="#"
            className="relative inline-flex items-center justify-center w-12 h-12 text-white rounded-full"
          >
            <Img alt="avt-user" src={props.userId.avt || logo} variant="avt" />
          </a>
          <div>
            <h3 className="text-xl font-medium text-slate-700">
              {props.userId.name || props.userId.username || "User"}
            </h3>
            <p className="text-sm text-slate-400">
              {dayjs(props.createAt).format("YYYY-MM-DD HH:mm:ss") || ""}
            </p>
          </div>

          {props.isEdited ? (
            <p className="text-sm text-slate-400">edited</p>
          ) : (
            <></>
          )}
        </header>
        <p className="post-header"> {props.content || ""}</p>
      </div>
      <figure className="post-content ">
        <MediaLayout childrencomp={props.media} />
      </figure>
      <GroupButton
        buttonClassName="w-full inline-flex items-center justify-center h-12 gap-2 px-6 text-sm font-medium tracking-wide transition duration-300 justify-self-center hover:bg-red-100 hover:text-red-600 focus:bg-red-200 focus:text-red-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:border-red-300 disabled:bg-red-100 disabled:text-red-400"
        id={`reaction`}
        buttons={[
          { id: `like-${props.id}`, label: "Like", childrencomp: <LikeIcon /> },
          {
            id: `comment-${props.id}`,
            label: "Comment",
            childrencomp: <CommentIcon />,
          },
          {
            id: `share-${props.id}`,
            label: "Share",
            childrencomp: <ShareIcon />,
          },
        ]}
        variant={
          "w-full flex flex-row justify-around overflow-hidden transition duration-300 rounded shadow-lg shadow-red-100 hover:shadow-md hover:shadow-red-100 focus:shadow-md focus:shadow-red-100 whitespace-nowrap bg-red-50/50 text-red-400"
        }
      />
    </div>
  );
};

export default Card;

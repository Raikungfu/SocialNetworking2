import dayjs from "dayjs";
import { CardProps } from "./types";
import Img from "../Img";
import logo from "../../../assets/img/avtLogo.jpg";
import GroupButton from "../GroupElement/GroupButton";
import UnLikeIcon from "@mui/icons-material/ThumbUpOffAlt";
import LikeIcon from "@mui/icons-material/ThumbUpRounded";
import CommentIcon from "@mui/icons-material/ChatOutlined";
import ShareIcon from "@mui/icons-material/SendOutlined";
import MediaLayout from "../MediaLayout";
import Button from "../Button";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { useSelector } from "react-redux";
import { RootState } from "../../../hook/rootReducer";
import CommentCmp from "../Comment";
import {
  API_USER_GET_COMMENT_POSTS,
  API_USER_POST_LIKE,
} from "../../../service/Post/fetchPost";
import { useState } from "react";
import { Comment } from "./CommentContent/type";
import CommentContent from "./CommentContent";

const Card: React.FC<CardProps> = (props) => {
  const avt = useSelector((state: RootState) => state.user.userState.avt);
  const [isLiked, setIsLike] = useState<boolean>(props.isLiked || false);
  const [isShowComment, setIsShowComment] = useState<boolean>(true);
  const [likes, setLikes] = useState<number>(props.likes || 0);
  const [commentPages, setCommentPages] = useState<number>(0);
  const [listComments, setListComments] = useState<Array<Comment>>([]);

  const handleCommentClick = async () => {
    const res = (await API_USER_GET_COMMENT_POSTS({
      postId: props.postId,
      page: commentPages,
    })) as unknown as Array<Comment>;
    setListComments((prev) => [...prev, ...res]);
    setIsShowComment(true);
    setCommentPages(commentPages + 1);
  };

  const handleLikeClick = async () => {
    const res = (await API_USER_POST_LIKE({
      postId: props.postId,
    })) as unknown as string;
    if (res === "like") {
      setLikes(likes + 1);
      setIsLike(true);
    } else {
      setLikes(likes - 1);
      setIsLike(false);
    }
  };

  const updateNewComment = (data: Comment) => {
    setListComments((prev) => [...prev, data]);
  };
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
        buttonClassName="w-full inline-flex items-center justify-center h-12 gap-2 px-6 text-sm font-medium tracking-wide transition duration-300 justify-self-center disabled:cursor-not-allowed disabled:border-red-300 disabled:bg-red-100 disabled:text-red-400 hover:bg-red-100 hover:text-red-600"
        id={`reaction`}
        buttons={[
          {
            id: `like-${props.id}`,
            label: `${likes} Like`,
            childrencomp: isLiked ? <LikeIcon /> : <UnLikeIcon />,
            onClick: handleLikeClick,
          },
          {
            id: `comment-${props.id}`,
            label: `${props.comments || 0} Comment`,
            onClick: () => setIsShowComment(!isShowComment),
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
      <CommentCmp
        inputAvt={avt}
        formInput={{
          id: "comment-form",
          inputVariant:
            "w-full px-3 py-2 border focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-full",
          input: [
            {
              types: "text",
              id: "content",
              placeholder: "comment....",
              wrapInputVariant: "w-full",
            },
            {
              id: `${props.id}-post-attach-file-input`,
              types: "file",
              inputVariant: "sr-only",
              accept: "image/*, video/*",
              multiple: true,
              children: (
                <Button
                  id={"chat-attach-file-btn"}
                  childrencomp={
                    <AttachFileIcon className="p-1 rounded-full text-white bg-red-600 m-1 absolute  right-28 bottom-5" />
                  }
                  type="button"
                  onClick={() =>
                    document
                      .getElementById(`${props.id}-post-attach-file-input`)
                      ?.click()
                  }
                />
              ),
            },
          ],
          formVariant: "w-full p-4 flex flex-row items-center relative",
          buttonVariant:
            "rounded-full text-white bg-red-600 absolute right-4 bottom-4",
        }}
        postId={props.postId}
        listComment={listComments}
        onSendCommentSuccess={updateNewComment}
      />
      {isShowComment && <CommentContent listComment={listComments} />}
      <p
        className="underline underline-offset-2 cursor-pointer"
        onClick={handleCommentClick}
      >
        View more comments...
      </p>
    </div>
  );
};

export default Card;

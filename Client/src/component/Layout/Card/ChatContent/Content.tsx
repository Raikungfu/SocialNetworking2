import { useSelector } from "react-redux";
import Img from "../../Img";
import MediaLayout from "../../MediaLayout";
import Paragraph from "../../Text/Paragraph";
import { ContentProps } from "./type";
import { RootState } from "../../../../hook/rootReducer";
import logo from "../../../../assets/img/logoAvt.jpeg";

const ChatContent: React.FC<ContentProps> = (props) => {
  const chatRoomType = useSelector(
    (state: RootState) => state.chatBox.recept?.type
  );
  const chatIndivisual = useSelector(
    (state: RootState) => state.chatBox.recept
  );
  const chatGroup = useSelector((state: RootState) => state.chatBox.members);
  return props.content.map((content, index) => (
    <div
      className={`${props.wrapContentCard} ${
        content.sender_id === props.me ? "justify-end" : ""
      } `}
      id={content._id}
    >
      {content.sender_id !== props.me && (
        <Img
          variant="avt"
          className="items-center"
          src={
            chatRoomType === "individual"
              ? chatIndivisual?.avt || logo
              : (chatGroup &&
                  chatGroup[content.sender_id] &&
                  chatGroup[content.sender_id].avt) ||
                logo
          }
        />
      )}
      <div className="w-full flex flex-col">
        {content.content["chat-attach-file-input"] &&
          content.content["chat-attach-file-input"].length > 0 && (
            <div
              className={`${
                content.sender_id === props.me
                  ? "bg-red-400 text-white self-end flex flex-row w-full"
                  : "bg-gray-200 text-gray-700"
              } ${props.wrapContent}`}
            >
              <MediaLayout
                childrencomp={content.content["chat-attach-file-input"]}
              />
            </div>
          )}
        {content.content["content"] && (
          <Paragraph
            id={`message-id-${index}`}
            wrapClassName={`${
              content.sender_id === props.me ? "justify-end" : "justify-start"
            } flex flex-row w-full`}
            content={content.content["content"] && content.content["content"]}
            contentClassName={`${
              content.sender_id === props.me
                ? "bg-red-400 text-white"
                : "bg-gray-200 text-gray-700"
            } ${props.wrapContent}`}
          />
        )}
      </div>
    </div>
  ));
};

export default ChatContent;

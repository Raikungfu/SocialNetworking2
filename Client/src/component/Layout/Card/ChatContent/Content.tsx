import { useSelector } from "react-redux";
import Img from "../../Img";
import MediaLayout from "../../MediaLayout";
import Paragraph from "../../Text/Paragraph";
import { ContentProps } from "./type";
import { RootState } from "../../../../hook/rootReducer";
import logo from "../../../../assets/img/logoAvt.jpeg";
import dayjs from "dayjs";

const ChatContent: React.FC<ContentProps> = (props) => {
  const chatRoomType = useSelector(
    (state: RootState) => state.chatBox.recept?.type
  );
  const chatIndividual = useSelector(
    (state: RootState) => state.chatBox.recept
  );
  const chatGroup = useSelector((state: RootState) => state.chatBox.members);

  return (
    <>
      {props.content.map((content, i) => {
        const isOne =
          props.content[i].sender_id === props.content[i + 1]?.sender_id;
        return (
          <div
            className={`${props.wrapContentCard} ${
              content.sender_id === props.me ? "justify-end" : ""
            } relative`}
            id={content._id}
            key={`message-${i}`}
          >
            {content.sender_id !== props.me && (
              <div className="w-8 h-8 self-center">
                {isOne ? (
                  <></>
                ) : (
                  <Img
                    className="rounded-full"
                    src={
                      chatRoomType === "individual"
                        ? chatIndividual?.avt || logo
                        : (chatGroup &&
                            chatGroup[content.sender_id] &&
                            chatGroup[content.sender_id].avt) ||
                          logo
                    }
                  />
                )}
              </div>
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
                  id={`message-id-${i}`}
                  wrapClassName={`${
                    content.sender_id === props.me
                      ? "justify-end"
                      : "justify-start"
                  } flex flex-row w-full`}
                  content={content.content["content"]}
                  contentClassName={`${
                    content.sender_id === props.me
                      ? "bg-red-400 text-white"
                      : "bg-gray-200 text-gray-700"
                  } ${props.wrapContent}`}
                />
              )}
            </div>

            <p
              className={`self-center absolute bottom-1 w-20 pl-2 py-1 rounded-lg text-xs opacity-0 transition-opacity duration-300 ease-in-out hover:opacity-100 bg-gray-300 ${
                content.sender_id === props.me ? "right-0" : "left-8"
              }`}
            >
              {dayjs(content.sent_at).format("HH:mm:ss DD/MM/YYYY")}
            </p>
          </div>
        );
      })}
    </>
  );
};

export default ChatContent;

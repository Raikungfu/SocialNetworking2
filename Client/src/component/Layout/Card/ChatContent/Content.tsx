import MediaLayout from "../../MediaLayout";
import Paragraph from "../../Text/Paragraph";
import { ContentProps } from "./type";

const ChatContent: React.FC<ContentProps> = (props) => {
  return props.content.map((content, index) => (
    <div className={props.wrapContentCard}>
      {content.content["chat-attach-file-input"] &&
        content.content["chat-attach-file-input"].length > 0 && (
          <div
            className={`${
              content.sender_id === props.me
                ? "bg-red-400 text-white self-end"
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
          } flex flex-row`}
          content={content.content["content"] && content.content["content"]}
          contentClassName={`${
            content.sender_id === props.me
              ? "bg-red-400 text-white"
              : "bg-gray-200 text-gray-700"
          } ${props.wrapContent}`}
        />
      )}
    </div>
  ));
};

export default ChatContent;

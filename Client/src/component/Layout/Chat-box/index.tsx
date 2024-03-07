import { useEffect, useRef, useState } from "react";
import { API_SEND_MESSAGE } from "../../../service/Chat/fetchMessage";
import Button from "../Button";
import Form from "../Form";
import ChatIcon from "@mui/icons-material/TextsmsOutlined";
import CloseĨon from "@mui/icons-material/CloseOutlined";
import Paragraph from "../Text/Paragraph";

const Chat: React.FC = () => {
  const [isChatBoxOpen, setIsChatBoxOpen] = useState<boolean>(false);
  const refChatArea = useRef<HTMLDivElement>(null);
  const [chatContent, setChatContent] = useState<
    { sender: string; content: string | JSX.Element }[]
  >([]);
  const handleSendMessageSuccess = (message: object) => {
    console.log("Sending message", message);
  };
  const handleSendMessageFail = (error: string) => {
    console.log("Error", error);
  };

  const updateMyMessage = (message: { content: string | JSX.Element }) => {
    const newMessagesList = [...chatContent];
    newMessagesList.push({ sender: "me", content: message.content });
    setChatContent(newMessagesList);
  };

  useEffect(() => {
    refChatArea.current?.lastElementChild?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [chatContent, isChatBoxOpen]);

  return (
    <>
      <div className="fixed bottom-0 right-0 mb-4 mr-4">
        <Button
          id={"bubble-chat"}
          children={<ChatIcon />}
          className="z-20 bg-red-300 rounded-3xl py-2 px-3 text-white flex flex-col shrink-0 grow-0 justify-around 
                  fixed bottom-0 right-5
                  mr-1 mb-5 lg:mr-5 lg:mb-5 xl:mr-10 xl:mb-10"
          onClick={() => setIsChatBoxOpen(!isChatBoxOpen)}
        />
      </div>
      <div
        id="chat-container"
        className={`${isChatBoxOpen || "hidden"} fixed bottom-24 right-8 w-96`}
      >
        <div className="bg-white shadow-md rounded-lg max-w-lg w-full">
          <div className="p-4 border-b bg-red-400 text-white rounded-t-lg flex justify-between items-center">
            <p className="text-lg font-semibold">Chat with ...</p>
            <Button
              id={"close-chat"}
              children={<CloseĨon />}
              className="text-gray-300 hover:text-gray-400 focus:outline-none focus:text-gray-400"
              onClick={() => setIsChatBoxOpen(false)}
            />
          </div>
          <div
            ref={refChatArea}
            id="chatbox"
            className="p-4 h-80 overflow-y-auto flex flex-col overflow-x-hidden"
          >
            {chatContent.map((content, index) => (
              <Paragraph
                key={`message-key-${index}`}
                id={`message-id-${index}`}
                wrapClassName={`flex flex-row mb-2 ${
                  content.sender === "me" ? "justify-end" : "justify-start"
                } `}
                content={content.content}
                contentClassName={`${
                  content.sender === "me"
                    ? "bg-red-400 text-white"
                    : "bg-gray-200 text-gray-700"
                } rounded-lg py-2 px-4 inline-block max-w-[80%] text-balance hyphens-auto`}
              />
            ))}
          </div>
          <Form
            formClassName="flex flex-row p-4"
            formVariant="p-4 border-t flex"
            wrapInputVariant="basis-[80%]"
            inputVariant="w-full px-3 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            input={[
              {
                types: "text",
                id: "content",
                placeholder: "message....",
              },
            ]}
            groupBtn={{
              id: "send-btn",
              buttons: [
                {
                  id: "btn-send",
                  label: "Send",
                  type: "submit",
                },
              ],
              variant:
                "bg-red-400 text-white px-4 py-2 rounded-r-md hover:bg-red-600 transition duration-300",
            }}
            onSubmitSuccess={handleSendMessageSuccess}
            onSubmitFail={handleSendMessageFail}
            apiFetchForm={API_SEND_MESSAGE}
            formBeforeSubmit={(data) =>
              updateMyMessage(data as { content: string | JSX.Element })
            }
          />
        </div>
      </div>
    </>
  );
};

export default Chat;

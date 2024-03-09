import { useEffect, useRef, useState } from "react";
import Button from "../Button";
import ChatIcon from "@mui/icons-material/TextsmsOutlined";
import CloseĨon from "@mui/icons-material/CloseOutlined";
import Paragraph from "../Text/Paragraph";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../hook/rootReducer";
import { setIsChatBoxOpen } from "../../../hook/ChatBoxSlice";
import Img from "../Img";
import avt from "../../../assets/img/logoAvt.jpeg";
import socket from "../../../config/socketIO";
import Form from "./Form";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import MediaLayout from "../MediaLayout";

const Chat: React.FC = () => {
  const dispatch = useDispatch();
  const isChatBoxOpen = useSelector(
    (state: RootState) => state.chatBox.isChatBoxOpen
  );
  const chatWith = useSelector((state: RootState) => state.chatBox.recept);
  const me = useSelector((state: RootState) => state.user.userState.id);
  const refChatArea = useRef<HTMLDivElement>(null);
  const notiChat = useRef<HTMLSpanElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [chatContent, setChatContent] = useState<
    Array<{
      sender: string;
      content: {
        "chat-attach-file-input"?: Array<{ url: string; type: string }>;
        content?: string;
      };
      createAt?: string;
      state?: string;
      file?: JSX.Element;
    }>
  >([]);

  useEffect(() => {
    socket.on("individual_typing", (response) => {
      if (response) {
        if (notiChat.current) {
          notiChat.current.style.display = "inline";
          if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
          }
          notiChat.current.textContent = "typing...";
          timeoutRef.current = setTimeout(() => {
            notiChat.current!.style.display = "none";
          }, 300);
        }
      }
    });
    socket.on("individual_message", (response) => {
      if (response) {
        setChatContent((prevChat) => [
          ...prevChat,
          {
            sender: response.sender,
            content: response.content,
            createAt: response.createAt,
          },
        ]);
        console.log(chatContent);
      } else {
        console.error("Network not working...");
      }
    });

    return () => {
      socket.off("individual_message");
      socket.off("individual_typing");
      setChatContent([]);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chatWith]);

  const handleInputChange = () => {
    const data = chatWith?.id;
    socket.emit("individual:typing", data);
  };

  useEffect(() => {
    refChatArea.current?.lastElementChild?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, [chatContent]);

  const handleSuccess = (response: {
    "chat-attach-file-input"?: Array<{ url: string; type: string }>;
    content?: string;
  }) => {
    setChatContent((prevChat) => [
      ...prevChat,
      {
        sender: me || "",
        content: response,
        createAt: Date.now().toString(),
      },
    ]);
    console.log(chatContent);
    try {
      socket.emit(
        "message:individual",
        {
          content: response,
          recipientId: chatWith?.id,
        },
        (response: string) => {
          if (response) {
            if (notiChat.current) {
              notiChat.current.style.display = "inline";
              notiChat.current.textContent = response;
            }
          }
        }
      );
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };
  const handleError = (error: string) => {
    console.log(error);
  };

  return (
    <>
      <div className="fixed bottom-0 right-0 mb-4 mr-4">
        <Button
          id={"bubble-chat"}
          children={<ChatIcon />}
          className="z-20 bg-red-300 rounded-3xl py-2 px-3 text-white flex flex-col shrink-0 grow-0 justify-around 
                  fixed bottom-0 right-5
                  mr-1 mb-5 lg:mr-5 lg:mb-5 xl:mr-10 xl:mb-10"
          onClick={() => dispatch(setIsChatBoxOpen(!isChatBoxOpen))}
        />
      </div>
      {isChatBoxOpen && (
        <div id="chat-container" className={`fixed bottom-24 right-8 w-96`}>
          <div className="bg-white shadow-md rounded-lg max-w-lg w-full">
            <div className="p-4 border-b bg-red-400 text-white rounded-t-lg flex justify-between items-center">
              <div className="flex flex-row gap-2">
                <Img src={chatWith?.avt || avt} variant="avt" />
                <p className="text-lg font-semibold">
                  {" "}
                  {chatWith?.name ?? "Chat with ..."}
                </p>
              </div>
              <Button
                id={"close-chat"}
                children={<CloseĨon />}
                className="text-gray-300 hover:text-gray-400 focus:outline-none focus:text-gray-400"
                onClick={() => dispatch(setIsChatBoxOpen(false))}
              />
            </div>
            <div
              ref={refChatArea}
              id="chatbox"
              className="p-4 h-80 overflow-y-auto flex flex-col overflow-x-hidden"
            >
              {chatContent.map((content, index) => (
                <>
                  <div className={"flex flex-col"}>
                    {content.content["chat-attach-file-input"] && (
                      <div
                        className={`${
                          content.sender === me
                            ? "bg-red-400 text-white self-end"
                            : "bg-gray-200 text-gray-700"
                        } rounded-lg py-2 px-4 inline-block max-w-[80%] text-balance hyphens-auto`}
                      >
                        <MediaLayout
                          children={content.content["chat-attach-file-input"]}
                        />
                      </div>
                    )}
                  </div>

                  {content.content["content"] && (
                    <Paragraph
                      key={`message-key-${index}`}
                      id={`message-id-${index}`}
                      wrapClassName={`${
                        content.sender === me ? "justify-end" : "justify-start"
                      } flex flex-row mb-2`}
                      content={
                        content.content["content"] && content.content["content"]
                      }
                      contentClassName={`${
                        content.sender === me
                          ? "bg-red-400 text-white"
                          : "bg-gray-200 text-gray-700"
                      } rounded-lg py-2 px-4 inline-block max-w-[80%] text-balance hyphens-auto`}
                    />
                  )}
                </>
              ))}
              <span
                ref={notiChat}
                className="text-right italic"
                style={{ display: "none" }}
              ></span>
            </div>
            <Form
              formVariant="w-full p-4 flex flex-row items-center"
              inputVariant="w-full px-3 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              input={[
                {
                  types: "text",
                  id: "content",
                  placeholder: "message....",
                  wrapInputVariant: "w-full",
                },
                {
                  id: "chat-attach-file-input",
                  types: "file",
                  inputVariant: "sr-only",
                  accept: "image/*, video/*",
                  multiple: true,
                  children: (
                    <Button
                      id={"chat-attach-file-btn"}
                      children={
                        <AttachFileIcon className="p-1 rounded-full text-white bg-red-600 m-1 absolute  right-28 bottom-5" />
                      }
                      type="button"
                      onClick={() =>
                        document
                          .getElementById("chat-attach-file-input")
                          ?.click()
                      }
                    />
                  ),
                },
              ]}
              onSubmitSuccess={handleSuccess}
              onSubmitFail={handleError}
              onInputChange={handleInputChange}
              id={"chat-box"}
              buttonVariant=" rounded-full text-white bg-red-600 absolute right-4 bottom-4"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Chat;

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

const Chat: React.FC = () => {
  const dispatch = useDispatch();
  const isChatBoxOpen = useSelector(
    (state: RootState) => state.chatBox.isChatBoxOpen
  );
  const chatWith = useSelector((state: RootState) => state.chatBox.recept);
  const refChatArea = useRef<HTMLDivElement>(null);
  const typing = "";
  const notiChat = useRef<HTMLSpanElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [chatContent, setChatContent] = useState<
    {
      sender: string;
      content: string | JSX.Element;
      createAt?: string;
      state?: string;
      file?: JSX.Element;
    }[]
  >([]);

  useEffect(() => {
    const data = chatWith?.id;
    socket.emit("individual:typing", data);
  }, [typing, chatWith]);

  useEffect(() => {
    socket.on("individual_message", (response) => {
      if (response) {
        setChatContent((prevChat) => [
          ...prevChat,
          { sender: "", content: response.data },
        ]);
      } else {
        console.error("Network not working...");
      }
    });

    socket.on("individual_typing", (response) => {
      if (response) {
        if (notiChat.current) {
          notiChat.current.style.display = "inline";
          if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
          }
          timeoutRef.current = setTimeout(() => {
            notiChat.current!.style.display = "none";
          }, 1000);
        }
      }
    });

    return () => {
      socket.off("individual_message");
    };
  }, []);

  // const handleSendMessage = async (data: object) => {
  //   setChatContent((prevChat) => [
  //     ...prevChat,
  //     {
  //       sender: "me",
  //       content: data?.content,
  //       createAt: Date.now().toString(),
  //     },
  //   ]);
  //   try {
  //     socket.emit(
  //       "message:individual",
  //       {
  //         content: data,
  //         recipientId: chatWith?.id,
  //       },
  //       (response: string) => {
  //         alert(response);
  //       }
  //     );
  //   } catch (error) {
  //     console.error("Error sending message:", error);
  //   }
  // };

  // const handleSendFile = async (data: object) => {
  //   setChatContent((prevChat) => [
  //     ...prevChat,
  //     {
  //       sender: "me",
  //       content: data?.content,
  //       createAt: Date.now().toString(),
  //     },
  //   ]);
  //   try {
  //     socket.emit(
  //       "message:individual",
  //       {
  //         content: data,
  //         recipientId: chatWith?.id,
  //       },
  //       (response: string) => {
  //         alert(response);
  //       }
  //     );
  //   } catch (error) {
  //     console.error("Error sending message:", error);
  //   }
  // };

  useEffect(() => {
    refChatArea.current?.lastElementChild?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [chatContent, isChatBoxOpen]);

  const handleSuccess = (response: object) => {
    console.log(response);
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
      <div
        id="chat-container"
        className={`${isChatBoxOpen || "hidden"} fixed bottom-24 right-8 w-96`}
      >
        <div className="bg-white shadow-md rounded-lg max-w-lg w-full">
          <div className="p-4 border-b bg-red-400 text-white rounded-t-lg flex justify-between items-center">
            <div className="flex flex-row gap-2">
              <Img src={chatWith?.avt || avt} variant="avt" />
              <p className="text-lg font-semibold"> {chatWith?.name}</p>
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
            <span
              ref={notiChat}
              className="right-0"
              style={{ display: "none" }}
            >
              Typing...
            </span>
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
                id: "input-file",
                types: "file",
                inputVariant: "sr-only",
                accept: "image/*, video/*",
                multiple: true,
                children: (
                  <AttachFileIcon className="p-1 rounded-full text-white bg-red-600 m-1 absolute  right-28 bottom-5" />
                ),
              },
            ]}
            onSubmitSuccess={handleSuccess}
            onSubmitFail={handleError}
            id={"chat-box"}
            buttonVariant=" rounded-full text-white bg-red-600 absolute  right-2 bottom-4"
          />
        </div>
      </div>
    </>
  );
};

export default Chat;

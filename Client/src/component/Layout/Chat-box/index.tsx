import { useEffect, useRef, useState } from "react";
import Button from "../Button";
import ChatIcon from "@mui/icons-material/TextsmsOutlined";
import CloseIcon from "@mui/icons-material/CloseOutlined";
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
import InfiniteScroll from "react-infinite-scroller";
import { ChatContentProps } from "./type";
import { API_USER_GET_MESSAGE_INDIVIDUAL } from "../../../service/Chat/fetchMessage";

const Chat: React.FC = () => {
  const dispatch = useDispatch();
  const isChatBoxOpen = useSelector(
    (state: RootState) => state.chatBox.isChatBoxOpen
  );
  const chatWith = useSelector((state: RootState) => state.chatBox.recept);
  const me = useSelector((state: RootState) => state.user.userState.id);
  const roomId = useSelector((state: RootState) => state.chatBox.roomId);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [newPageStart, setNewPageStart] = useState<number>(0);
  const [numberNewChat, setNumberNewChat] = useState<number>(0);
  const refChatArea = useRef<HTMLDivElement>(null);
  const notificationChat = useRef<HTMLSpanElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [chatContent, setChatContent] = useState<ChatContentProps>([]);

  interface IndividualMessage {
    sender: string;
    content: {
      "chat-attach-file-input"?: Array<{ url: string; type: string }>;
      content?: string;
    };
    createAt?: string;
  }

  interface IndividualSendMessage {
    "chat-attach-file-input"?: Array<{ url: string; type: string }>;
    content?: string;
  }

  useEffect(() => {
    const handleIndividualTyping = (response: IndividualMessage) => {
      if (response) {
        if (notificationChat.current) {
          notificationChat.current.style.display = "inline";
          if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
          }
          notificationChat.current.textContent = "typing...";
          timeoutRef.current = setTimeout(() => {
            notificationChat.current!.style.display = "none";
          }, 300);
        }
        scrollToBottom();
      }
    };

    const handleIndividualMessage = (response: IndividualMessage) => {
      if (response) {
        setChatContent((prevChat) => [
          ...prevChat,
          {
            sender_id: response.sender,
            content: response.content,
            sent_at: response.createAt,
          },
        ]);
        setNumberNewChat(numberNewChat + 1);
        scrollToBottom();
      } else {
        console.error("Network not working...");
      }
    };

    socket.on("individual_typing", handleIndividualTyping);
    socket.on("individual_message", handleIndividualMessage);

    return () => {
      socket.off("individual_message", handleIndividualMessage);
      socket.off("individual_typing", handleIndividualTyping);
    };
  }, []);

  const sendMessage = (response: IndividualSendMessage) => {
    setChatContent((prevChat) => [
      ...prevChat,
      {
        sender_id: me || "",
        content: response,
        sent_at: Date.now().toString(),
      },
    ]);
    try {
      socket.emit(
        "message:individual",
        {
          content: response,
          recipientId: chatWith?.id,
          roomId: roomId,
        },
        (response: string) => {
          if (response) {
            if (notificationChat.current) {
              notificationChat.current.style.display = "inline";
              notificationChat.current.style.marginBottom = "10px";
              notificationChat.current.textContent = response;
            }
            setNumberNewChat(numberNewChat + 1);
            scrollToBottom();
          }
        }
      );
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const handleSuccess = (response: IndividualSendMessage) => {
    sendMessage(response);
  };

  const handleError = (error: string) => {
    console.log(error);
  };

  const loadMore = async (page: number) => {
    const response = await API_USER_GET_MESSAGE_INDIVIDUAL({
      page,
      numberNewChat,
      roomId,
      chatWith,
      me,
    });
    console.log(chatWith, response);
    if (response) {
      const data = response as unknown as ChatContentProps;
      data && data.length > 0
        ? setChatContent((prevChats) => [...data, ...prevChats])
        : setHasMore(false);
    }
  };

  const scrollToBottom = () => {
    refChatArea.current?.lastElementChild?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const handleInputChange = () => {
    const data = chatWith?.id;
    socket.emit("individual:typing", data);
  };

  useEffect(() => {
    setChatContent([]);
    setNewPageStart(0);
    setHasMore(true);
    scrollToBottom();
  }, [chatWith, isChatBoxOpen]);

  return (
    <>
      <div className="fixed bottom-0 right-0 mb-4 mr-4">
        <Button
          id={"bubble-chat"}
          childrencomp={<ChatIcon />}
          className="z-20 bg-red-500 rounded-3xl py-2 px-3 text-white flex flex-col shrink-0 grow-0 justify-around 
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
                childrencomp={<CloseIcon />}
                className="text-gray-300 hover:text-gray-400 focus:outline-none focus:text-gray-400"
                onClick={() => dispatch(setIsChatBoxOpen(false))}
              />
            </div>
            <div
              ref={refChatArea}
              id="chat-box"
              className="p-2 h-80 overflow-y-auto flex flex-col overflow-x-hidden"
            >
              <InfiniteScroll
                hasMore={hasMore}
                initialLoad={true}
                loadMore={loadMore}
                isReverse={true}
                pageStart={newPageStart}
                threshold={250}
                useCapture={false}
                useWindow={true}
                loader={<>Loading...</>}
              >
                {chatContent.map((content, index) => (
                  <div className={"flex flex-col mb-1"} key={"chatContent"}>
                    {content.content["chat-attach-file-input"] &&
                      content.content["chat-attach-file-input"].length > 0 && (
                        <div
                          className={`${
                            content.sender_id === me
                              ? "bg-red-400 text-white self-end"
                              : "bg-gray-200 text-gray-700"
                          } rounded-lg py-2 px-2 inline-block max-w-[80%] text-balance hyphens-auto`}
                        >
                          <MediaLayout
                            childrencomp={
                              content.content["chat-attach-file-input"]
                            }
                          />
                        </div>
                      )}
                    {content.content["content"] && (
                      <Paragraph
                        id={`message-id-${index}`}
                        wrapClassName={`${
                          content.sender_id === me
                            ? "justify-end"
                            : "justify-start"
                        } flex flex-row`}
                        content={
                          content.content["content"] &&
                          content.content["content"]
                        }
                        contentClassName={`${
                          content.sender_id === me
                            ? "bg-red-400 text-white"
                            : "bg-gray-200 text-gray-700"
                        } rounded-lg py-2 px-4 inline-block max-w-[80%] text-balance hyphens-auto`}
                      />
                    )}
                  </div>
                ))}
              </InfiniteScroll>
              <span
                ref={notificationChat}
                className="text-right italic"
                style={{ display: "none" }}
              ></span>
            </div>
            <Form
              formVariant="w-full p-4 flex flex-row items-center"
              inputVariant="w-full px-3 py-2 border focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-e-full"
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
                      childrencomp={
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
              buttonVariant="rounded-full text-white bg-red-600 absolute right-4 bottom-4"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Chat;

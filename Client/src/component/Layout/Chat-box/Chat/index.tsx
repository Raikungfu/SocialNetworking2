import React, { useState, useRef, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroller";
import { useSelector } from "react-redux";
import socket from "../../../../config/socketIO";
import { ChatContentProps } from "../type";
import { RootState } from "../../../../hook/rootReducer";
import { API_USER_GET_MESSAGE_INDIVIDUAL } from "../../../../service/Chat/chatIndivisual";
import {
  IndividualMessage,
  IndividualSendMessage,
} from "../../Form/FormInputWithAttachFile/types";
import Form from "../../Form/FormInputWithAttachFile";
import ContentCard from "../../Card/ChatContent/Content";
import { ChatProps } from "./type";

const Chat: React.FC<ChatProps> = (props) => {
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [newPageStart, setNewPageStart] = useState<number>(0);
  const [chatContent, setChatContent] = useState<ChatContentProps>([]);
  const me = useSelector((state: RootState) => state.user.userState.id);
  const roomId = useSelector((state: RootState) => state.chatBox.roomId);
  const [numberNewChat, setNumberNewChat] = useState<number>(0);
  const notificationChat = useRef<HTMLSpanElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const chatWith = useSelector((state: RootState) => state.chatBox.recept);
  const refChatArea = useRef<HTMLDivElement>(null);
  const isChatBoxOpen = useSelector(
    (state: RootState) => state.chatBox.isChatBoxOpen
  );

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

  const loadMore = async (page: number) => {
    const response = await API_USER_GET_MESSAGE_INDIVIDUAL({
      page,
      numberNewChat,
      roomId,
      chatWith,
    });
    if (response) {
      const data = response as unknown as ChatContentProps;
      data && data.length > 0
        ? setChatContent((prevChats) => [...data, ...prevChats])
        : setHasMore(false);
    }
  };

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

  const scrollToBottom = () => {
    refChatArea.current?.lastElementChild?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  useEffect(() => {
    setChatContent([]);
    setNewPageStart(0);
    setHasMore(true);
    scrollToBottom();
  }, [chatWith, isChatBoxOpen]);
  return (
    <>
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
          <ContentCard
            content={chatContent}
            me={me}
            wrapContentCard={"flex flex-col mb-1"}
            wrapContent={
              " rounded-lg py-2 px-2 inline-block max-w-[80%] text-balance hyphens-auto"
            }
          />
        </InfiniteScroll>
        <span
          ref={notificationChat}
          className="text-right italic"
          style={{ display: "none" }}
        ></span>
      </div>
      <Form {...props.formInput} onSubmitSuccess={handleSuccess} />
    </>
  );
};

export default Chat;

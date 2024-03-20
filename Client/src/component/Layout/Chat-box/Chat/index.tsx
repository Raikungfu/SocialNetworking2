import React, { useState, useRef, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroller";
import { useSelector } from "react-redux";
import socket from "../../../../config/socketIO";
import { ChatContentProps } from "../type";
import { RootState } from "../../../../hook/rootReducer";
import {
  API_USER_GET_MESSAGE_GROUP,
  API_USER_GET_MESSAGE_INDIVIDUAL,
} from "../../../../service/Chat/chatIndivisual";
import {
  IndividualMessage,
  IndividualSendMessage,
} from "../../Form/FormInputWithAttachFile/types";
import Form from "../../Form/FormInputWithAttachFile";
import ContentCard from "../../Card/ChatContent/Content";
import { ChatProps } from "./type";

const Chat: React.FC<ChatProps> = (props) => {
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [newPageStart, setNewPageStart] = useState<number>();
  const [chatContent, setChatContent] = useState<ChatContentProps>([]);
  const me = useSelector((state: RootState) => state.user.userState.id);
  const roomId = useSelector((state: RootState) => state.chatBox.roomId);
  const [numberNewChat, setNumberNewChat] = useState<number>(0);
  const notificationChat = useRef<HTMLSpanElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const chatWith = useSelector((state: RootState) => state.chatBox.recept);
  const members = useSelector((state: RootState) => state.chatBox.members);
  const refChatArea = useRef<HTMLDivElement>(null);
  const isChatBoxOpen = useSelector(
    (state: RootState) => state.chatBox.isChatBoxOpen
  );

  useEffect(() => {
    const handleIndividualTyping = (response: IndividualMessage) => {
      console.log(response);
      if (
        response &&
        ((chatWith?.type === "individual" &&
          response.roomId === chatWith?.id) ||
          (chatWith?.type === "group" && response.roomId !== me))
      ) {
        if (notificationChat.current) {
          notificationChat.current.style.display = "inline";
          if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
          }
          notificationChat.current.textContent = `${
            chatWith.type === "individual"
              ? ""
              : members && members[response.roomId].name
          } typing...`;
          timeoutRef.current = setTimeout(() => {
            notificationChat.current!.style.display = "none";
          }, 300);
        }
        scrollToBottom();
      }
    };

    const handleIndividualMessage = (response: IndividualMessage) => {
      if (
        response &&
        ((chatWith?.type === "individual" &&
          response.roomId === chatWith?.id) ||
          (chatWith?.type === "group" && response.roomId !== me))
      ) {
        setChatContent((prevChat) => [
          ...prevChat,
          {
            sender_id: response.sender,
            content: response.content,
            sent_at: response.createAt,
          },
        ]);
        scrollToBottom();
        setNumberNewChat(numberNewChat + 1);
      } else {
        console.error("Network not working...");
      }
    };

    setNewPageStart(0);
    setHasMore(true);
    setChatContent([]);
    if (chatWith && chatWith.type === "individual") {
      socket.on("individual_typing", handleIndividualTyping);
      socket.on("individual_message", handleIndividualMessage);
      socket.off("group_typing", handleIndividualTyping);
      socket.off("group_message", handleIndividualMessage);
    } else {
      socket.on("group_typing", handleIndividualTyping);
      socket.on("group_message", handleIndividualMessage);
      socket.off("individual_message", handleIndividualMessage);
      socket.off("individual_typing", handleIndividualTyping);
    }

    return () => {
      socket.off("group_typing", handleIndividualTyping);
      socket.off("group_message", handleIndividualMessage);
      socket.off("individual_message", handleIndividualMessage);
      socket.off("individual_typing", handleIndividualTyping);
    };
  }, [chatWith, isChatBoxOpen]);

  const loadMore = async () => {
    let response;
    chatWith?.type === "individual"
      ? (response = await API_USER_GET_MESSAGE_INDIVIDUAL({
          newPageStart,
          numberNewChat,
          roomId,
          chatWith,
        }))
      : (response = await API_USER_GET_MESSAGE_GROUP({
          newPageStart,
          numberNewChat,
          roomId,
          chatWith,
        }));
    if (response) {
      console.log(response);
      const data = response as unknown as ChatContentProps;
      if (data && data.length > 0) {
        setChatContent((prevChats) => [...data, ...prevChats]);
        setNewPageStart((newPageStart || 0) + 1);
        scrollToBottom();
      } else {
        setHasMore(false);
      }
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
      chatWith?.type === "individual"
        ? socket.emit(
            "message:individual",
            {
              content: response,
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
          )
        : socket.emit(
            "massage:group",
            {
              content: response,
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
      block: "end",
    });
  };

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
            wrapContentCard={"flex flex-row py-2 gap-2"}
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

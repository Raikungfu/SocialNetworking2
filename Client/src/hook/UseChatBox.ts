import { useDispatch, useSelector } from "react-redux";
import socket from "../config/socketIO";
import {
  setReceptId,
  setRoomId,
  setIsChatBoxOpen,
  setMembers,
} from "./ChatBoxSlice";
import {
  setRoomGroup,
  setRoomGroupMembers,
  setRoomIndividual,
} from "./ChatRoomSlice";
import { RootState } from "./rootReducer";
import { roomChat } from "../type/API/User";

export const useChatBox = () => {
  const dispatch = useDispatch();
  const isChatBoxOpen = useSelector(
    (state: RootState) => state.chatBox.isChatBoxOpen
  );
  const onChatWith = useSelector(
    (state: RootState) => state.chatBox.recept?.id
  );
  const chatRoomIndividual = useSelector(
    (state: RootState) => state.chatRoom.chatRoomIndividual
  );

  const chatRoomGroup = useSelector(
    (state: RootState) => state.chatRoom.chatRoomGroup
  );

  const handleOpenReceptMessage = (data: roomChat) => {
    if (!onChatWith || data.id !== onChatWith) {
      const id = chatRoomIndividual[data.id];
      if (id) {
        dispatch(setReceptId({ ...data, type: "individual" }));
        dispatch(setRoomId(id.roomId));
      } else {
        socket.emit(
          "open:chatIndividual",
          data,
          (response: { chatRoomId?: string; error?: string }) => {
            if (response) {
              if (response.chatRoomId) dispatch(setRoomId(response.chatRoomId));
              dispatch(setReceptId({ ...data, type: "individual" }));
              dispatch(
                setRoomIndividual({
                  key: data.id,
                  value: {
                    member: {
                      _id: data.id,
                      name: data.name,
                      avt: data.avt,
                    },
                    roomId: response.chatRoomId as string,
                  },
                })
              );
            } else {
              alert(new Error("Network error..."));
            }
          }
        );
      }
    }
    dispatch(setIsChatBoxOpen(true));
  };

  const handleOpenGroupMessage = (data: roomChat) => {
    if (!onChatWith || data.id !== onChatWith) {
      const id = chatRoomGroup[data.id];
      if (id && Object.entries(id.members).length > 0) {
        dispatch(setReceptId({ ...data, type: "group" }));
        dispatch(setRoomId(id.roomId));
        dispatch(setMembers(id.members));
      } else {
        dispatch(setReceptId({ ...data, type: "group" }));
        dispatch(setRoomId(id.roomId));
        socket.emit(
          "open:chatGroup",
          data.id,
          (response: Array<{ _id: string; name: string; avt: string }>) => {
            if (response) {
              response.map((member) => {
                try {
                  dispatch(
                    setRoomGroupMembers({
                      key: data.id,
                      value: {
                        key: member._id,
                        member: {
                          name: member.name,
                          avt: member.avt,
                        },
                      },
                    })
                  );
                } catch (err) {
                  console.log(err);
                }
              });
            } else {
              alert(new Error("Network error..."));
            }
          }
        );
      }
    }
    dispatch(setIsChatBoxOpen(true));
  };

  const handleCreateGroupMessage = (data: roomChat) => {
    dispatch(
      setRoomGroup({
        key: data.id,
        value: {
          roomId: data.id,
          avt: data.avt,
          name: data.name,
          members: data.members || {},
        },
      })
    );
    try {
      dispatch(setReceptId({ ...data, type: "group" }));
      dispatch(setRoomId(data.id));
    } catch (err) {
      console.log(err);
    }
  };

  return {
    handleOpenReceptMessage,
    isChatBoxOpen,
    handleOpenGroupMessage,
    handleCreateGroupMessage,
  };
};

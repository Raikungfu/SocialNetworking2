import { useDispatch, useSelector } from "react-redux";
import socket from "../config/socketIO";
import { setReceptId, setRoomId, setIsChatBoxOpen } from "./ChatBoxSlice";
import { setRoomIndividual } from "./ChatRoomSlice";
import { RootState } from "./rootReducer";

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

  const handleOpenReceptMessage = (data: {
    id: string;
    name?: string;
    avt?: string;
  }) => {
    if (!onChatWith || data.id !== onChatWith) {
      const id = chatRoomIndividual[data.id];
      if (id) {
        dispatch(setReceptId(data));
        dispatch(setRoomId(id.roomId));
      } else {
        console.log(data);
        dispatch(setReceptId(data));
        socket.emit(
          "open:chatIndividual",
          data,
          (response: { chatRoomId?: string; error?: string }) => {
            if (response) {
              if (response.chatRoomId) dispatch(setRoomId(response.chatRoomId));
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
    dispatch(setIsChatBoxOpen(!isChatBoxOpen));
  };

  return { handleOpenReceptMessage, isChatBoxOpen };
};

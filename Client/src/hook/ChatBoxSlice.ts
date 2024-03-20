import { createSlice } from "@reduxjs/toolkit";
import { Member } from "./ChatRoomSlice";

interface ChatBoxState {
  isChatBoxOpen: boolean;
  roomId?: string;
  recept?: {
    id: string;
    avt: string;
    name: string;
    type: string;
  };
  members?: Record<string, Member>;
}

const initialState: ChatBoxState = {
  isChatBoxOpen: false,
};

const chatBoxSlice = createSlice({
  name: "chatBox",
  initialState,
  reducers: {
    setIsChatBoxOpen(state, action) {
      state.isChatBoxOpen = action.payload;
    },
    setRoomId(state, action) {
      state.roomId = action.payload;
    },
    setReceptId(state, action) {
      state.recept = action.payload;
    },
    setMembers(state, action) {
      state.members = action.payload;
    },
  },
});

export const { setIsChatBoxOpen, setRoomId, setReceptId, setMembers } =
  chatBoxSlice.actions;

export default chatBoxSlice.reducer;

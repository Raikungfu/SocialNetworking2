import { createSlice } from "@reduxjs/toolkit";

interface ChatBoxState {
  isChatBoxOpen: boolean;
  roomId?: string;
  recept?: {
    id: string;
    avt: string;
    name: string;
  };
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
  },
});

export const { setIsChatBoxOpen, setRoomId, setReceptId } =
  chatBoxSlice.actions;

export default chatBoxSlice.reducer;

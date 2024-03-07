import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Member {
  name?: string;
  avt?: string;
  isLoggedIn: boolean;
}

interface ChatRoom {
  state?: string;
  name?: string;
  roomNumber: number;
  members: Array<[string, Member]>;
}

interface ChatRoomState {
  chatRoom: ChatRoom[];
  payload: ChatRoom;
}

const initialState: ChatRoomState = {
  chatRoom: [],
  payload: {
    state: "",
    name: undefined,
    roomNumber: 0,
    members: [],
  },
};

export const chatRoomSlice = createSlice({
  name: "room",
  initialState,
  reducers: {
    setState: (state: ChatRoomState, action: PayloadAction<ChatRoom>) => {
      state.payload = action.payload;
    },
  },
});

export const { setState } = chatRoomSlice.actions;

export default chatRoomSlice.reducer;

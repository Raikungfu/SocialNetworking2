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

type ChatRoomIndividual = Record<
  string,
  {
    member: {
      _id: string;
      name?: string;
      avt?: string;
    };
    roomId: string;
    online?: boolean;
  }
>;

interface ChatRoomState {
  chatRoomIndividual: ChatRoomIndividual;
  chatRoomGroup: ChatRoom[];
  payload: ChatRoom;
}

const initialState: ChatRoomState = {
  chatRoomIndividual: {},
  chatRoomGroup: [],
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
    setRoomIndividual: (
      state: ChatRoomState,
      action: PayloadAction<{
        key: string;
        value: {
          member: {
            _id: string;
            name?: string;
            avt?: string;
          };
          roomId: string;
          online?: boolean;
        };
      }>
    ) => {
      const { key, value } = action.payload;
      state.chatRoomIndividual[key] = value;
    },
  },
});

export const { setState, setRoomIndividual } = chatRoomSlice.actions;

export default chatRoomSlice.reducer;

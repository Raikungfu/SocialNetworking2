import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Member {
  _id?: string;
  name?: string;
  avt?: string;
  isLoggedIn?: string;
}

type ChatRoomGroup = Record<
  string,
  {
    name?: string;
    avt?: string;
    roomId: string;
    lastMessage?: string;
    sender?: string;
    timeStamp?: Date;
    members: Record<string, Member>;
  }
>;
type ChatRoomIndividual = Record<
  string,
  {
    member?: {
      _id: string;
      name?: string;
      avt?: string;
    };
    roomId: string;
    online?: boolean;
    lastMessage?: string;
    sender?: string;
    timeStamp?: Date;
  }
>;

interface ChatRoomState {
  chatRoomIndividual: ChatRoomIndividual;
  chatRoomGroup: ChatRoomGroup;
}

const initialState: ChatRoomState = {
  chatRoomIndividual: {},
  chatRoomGroup: {},
};

export const chatRoomSlice = createSlice({
  name: "room",
  initialState,
  reducers: {
    setRoomIndividual: (
      state: ChatRoomState,
      action: PayloadAction<{
        key: string;
        value: {
          member?: {
            _id: string;
            name?: string;
            avt?: string;
          };
          roomId: string;
          online?: boolean;
          lastMessage?: string;
          sender?: string;
          timeStamp?: Date;
        };
      }>
    ) => {
      const { key, value } = action.payload;
      state.chatRoomIndividual[key] = value;
    },
    setRoomGroup: (
      state: ChatRoomState,
      action: PayloadAction<{
        key: string;
        value: {
          roomId: string;
          lastMessage?: string;
          avt?: string;
          name?: string;
          sender?: string;
          timeStamp?: Date;
          members: Record<string, Member>;
        };
      }>
    ) => {
      const { key, value } = action.payload;
      state.chatRoomGroup[key] = value;
    },
    setRoomGroupMembers: (
      state: ChatRoomState,
      action: PayloadAction<{
        key: string;
        value: { key: string; member: Member };
      }>
    ) => {
      const { key, value } = action.payload;
      state.chatRoomGroup[key].members[value.key] = value.member;
    },
    resetRoom: () => {
      return initialState;
    },
  },
});

export const {
  setRoomIndividual,
  resetRoom,
  setRoomGroup,
  setRoomGroupMembers,
} = chatRoomSlice.actions;

export default chatRoomSlice.reducer;

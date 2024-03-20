import { Member } from "../../hook/ChatRoomSlice";

export interface User {
  email: string;
  password: string;
  age?: string;
  gender?: string;
}

export interface authResponseData {
  accessToken: string;
  refreshToken: string;
  userName: string;
  avt: string;
  name: string;
  status: number;
}

export type ListChatIndividual = Array<{
  chatRoomId: {
    _id: string;
    lastMessage: string;
    sender: string;
    timeStamp: Date;
  };
  recipient: { name: string; _id: string };
}>;

export type ListChatGroup = Array<{
  members?: Array<{
    _id: string;
    name: string;
    avt: string;
  }>;
  _id: string;
  name: string;
  avt: string;
  lastMessage: string;
  sender: string;
  timeStamp: Date;
}>;

export type roomChat = {
  id: string;
  name?: string;
  avt?: string;
  members?: Record<string, Member>;
};

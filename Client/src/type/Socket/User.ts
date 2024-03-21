export interface FriendOnline {
  _id: string;
  name: string;
  avt: string;
}

export type MessageNoti = {
  _id?: string;
  type?: string;
  name?: string;
  avt?: string;
  variant?: string;
  title?: string;
  message?: string;
  roomName?: string;
  icon?: string | Element;
  variantMessage?: string;
};

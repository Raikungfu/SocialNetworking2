export interface FriendOnline {
  _id: string;
  name: string;
  avt: string;
}

export type MessageNoti = {
  _id?: string;
  wrapPopupVariant?: string;
  avt?: string;
  header?: string;
  information?: string;
  message?: string;
  variantMessage?: string;
  type?: string;
};

export interface ListProps {
  title?: string;
  API_GET_DATA: <T>(data: T) => Promise<T>;
  API_HANDLE_EVENT_1?: <T>(data: T) => Promise<T>;
  API_HANDLE_EVENT_2?: <T>(data: T) => Promise<T>;
  handleOnClick_1?: () => void;
  handleOnClick_2?: () => void;
  typeList: "communityList" | "friendsList" | "requestsList";
  wrapVariant?: string;
  handleOpenReceptMessage?: (data: {
    id: string;
    name?: string;
    avt?: string;
  }) => void;
  newRecord?: User;
  removeRecord?: (data: User) => void;
}

export interface User {
  _id: string;
  id: string;
  username?: string;
  age?: Date;
  avt?: string;
  gender?: string;
  name?: string;
  friend?: {
    _id: string;
    username?: string;
    age?: Date;
    avt?: string;
    gender?: string;
    name?: string;
  };
  online?: boolean;
}

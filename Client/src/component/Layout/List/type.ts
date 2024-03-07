export interface ListProps {
  title?: string;
  API_GET_DATA: <T>(data: T) => Promise<T>;
  API_HANDLE_EVENT: <T>(data: T) => Promise<T>;
  typeList: "communityList" | "friendsList" | "requestsList";
  wrapVariant?: string;
}

export interface User {
  _id: string;
  username?: string;
  age?: Date;
  avt?: string;
  gender?: string;
  name?: string;
  friend?: {
    username?: string;
    age?: Date;
    avt?: string;
    gender?: string;
    name?: string;
  };
}

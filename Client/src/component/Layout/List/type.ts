export interface ListProps {
  items: Array<User>;
}

export interface User {
  _id: string;
  username?: string;
  age?: Date;
  avt?: string;
  gender?: string;
  name?: string;
}

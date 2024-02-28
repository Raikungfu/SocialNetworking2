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

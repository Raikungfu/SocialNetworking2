import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { RootState } from "./rootReducer";

interface UserState {
  payload: {
    state: string;
    name?: string;
    userName?: string;
    avt?: string;
    accessToken?: string;
    refreshToken?: string;
  };
  userState: {
    state: string;
    name?: string;
    userName?: string;
    avt?: string;
  };
}

const initialState: UserState = {
  userState: {
    state: "",
  },
  payload: {
    state: "",
    name: undefined,
    userName: undefined,
    avt: undefined,
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setState: (state: UserState, action) => {
      Object.assign(state.userState, action.payload);
    },
    logoutUser: (state: UserState) => {
      Cookies.remove("refreshToken");
      Cookies.remove("accessToken");
      localStorage.clear();
      state.userState = {
        state: "inactive",
        name: undefined,
        userName: undefined,
        avt: undefined,
      };
    },
    loginUser: (state: UserState, action) => {
      state.userState = action.payload;
      state.userState.state = "active";
      Cookies.set("accessToken", action.payload.accessToken);
      Cookies.set("refreshToken", action.payload.refreshToken);
    },
    updateProfileSuccess: (state: UserState, action) => {
      Object.assign(state.userState, action.payload);
    },
  },
});

export const { setState, logoutUser, loginUser, updateProfileSuccess } =
  userSlice.actions;
export const selectUserState = (state: RootState) => state.user.userState;
export const selectUserName = (state: RootState) => state.user.userState.name;

export default userSlice.reducer;

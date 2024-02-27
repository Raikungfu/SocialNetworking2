import { createSlice } from "@reduxjs/toolkit";

interface UserState {
  payload: {
    state: string;
    name?: string;
    userName?: string;
    avt?: string;
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
    state: "inactive",
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
      state.userState = action.payload;
    },
    logoutUser: (state: UserState) => {
      Cookies.remove("refreshToken")
      state.userState = {
        state: "inactive",
      };
    },
  },
});

export const { setState, logoutUser } = userSlice.actions;

export default userSlice.reducer;

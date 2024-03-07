import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "./UserSlice";
import chatRoomReducer from "./ChatRoomSlice";

const rootReducer = combineReducers({
  user: userReducer,
  chatRoom: chatRoomReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;

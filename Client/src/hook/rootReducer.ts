import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "./UserSlice";
import chatRoomReducer from "./ChatRoomSlice";
import chatBoxReducer from "./ChatBoxSlice";

const rootReducer = combineReducers({
  user: userReducer,
  chatRoom: chatRoomReducer,
  chatBox: chatBoxReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;

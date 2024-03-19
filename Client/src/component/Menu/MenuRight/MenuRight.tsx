import {
  API_ACCEPT_REQUEST,
  API_GET_REQUESTS,
} from "../../../service/Community/fetchCommunity";
import List from "../../Layout/List";
import "./style.scss";
import { MenuRightProps } from "./type";
import { User } from "../../Layout/List/type";
import { useState } from "react";
import { useChatBox } from "../../../hook/UseChatBox";
import { API_LIST_FRIEND_ONLINE } from "../../../service/Chat/chatIndivisual";

const MenuRight: React.FC<MenuRightProps> = () => {
  const [newRequestAccept, setNewRequestAccept] = useState<User>();
  const { handleOpenReceptMessage } = useChatBox();

  return (
    <div className="flex flex-col justify-start gap-2">
      <List
        title="Requests"
        API_GET_DATA={API_GET_REQUESTS}
        wrapVariant="flex-1 max-h-40"
        typeList="requestsList"
        API_HANDLE_EVENT_1={API_ACCEPT_REQUEST}
        removeRecord={setNewRequestAccept}
      />
      <List
        title="List friends"
        API_GET_DATA={API_LIST_FRIEND_ONLINE}
        wrapVariant="flex-1 max-h-40"
        typeList="friendsList"
        API_HANDLE_EVENT_1={API_GET_REQUESTS}
        handleOpenReceptMessage={handleOpenReceptMessage}
        newRecord={newRequestAccept}
      />
    </div>
  );
};

export default MenuRight;

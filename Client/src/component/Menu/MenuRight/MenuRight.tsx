import {
  API_ACCEPT_REQUEST,
  API_GET_REQUESTS,
} from "../../../service/Community/fetchCommunity";
import List from "../../Layout/List";
import { MenuRightProps } from "./type";
import { User } from "../../Layout/List/type";
import { useState } from "react";
import { useChatBox } from "../../../hook/UseChatBox";
import { GET_LIST_FRIEND_ONLINE_VIA_SOCKET } from "../../../service/Chat/chatIndivisual";

const MenuRight: React.FC<MenuRightProps> = () => {
  const [newRequestAccept, setNewRequestAccept] = useState<User>();
  const { handleOpenReceptMessage } = useChatBox();

  return (
    <div className="flex flex-col justify-start gap-2">
      <List
        title="Requests"
        API_GET_DATA={API_GET_REQUESTS}
        wrapVariant="flex-1 overflow-y-auto max-h-96 py-2"
        typeList="requestsList"
        API_HANDLE_EVENT_1={API_ACCEPT_REQUEST}
        removeRecord={setNewRequestAccept}
      />
      <List
        title="List friends"
        API_GET_DATA={GET_LIST_FRIEND_ONLINE_VIA_SOCKET}
        wrapVariant="flex-1 overflow-y-auto max-h-96"
        typeList="friendsList"
        API_HANDLE_EVENT_1={API_GET_REQUESTS}
        handleOpenReceptMessage={handleOpenReceptMessage}
        newRecord={newRequestAccept}
      />
    </div>
  );
};

export default MenuRight;

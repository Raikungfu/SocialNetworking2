import {
  API_ACCEPT_REQUEST,
  API_GET_LIST_FRIENDS,
  API_GET_REQUESTS,
} from "../../../service/Community/fetchCommunity";
import List from "../../Layout/List";
import "./style.scss";
import { MenuRightProps } from "./type";

const MenuRight: React.FC<MenuRightProps> = () => {
  return (
    <div className="flex flex-col justify-start gap-2">
      <List
        title="Requests"
        API_GET_DATA={API_GET_REQUESTS}
        wrapVariant="max-h-40"
        typeList="requestsList"
        API_HANDLE_EVENT={API_ACCEPT_REQUEST}
      />
      <List
        title="List friends"
        API_GET_DATA={API_GET_LIST_FRIENDS}
        wrapVariant="max-h-40"
        typeList="friendsList"
        API_HANDLE_EVENT={API_GET_REQUESTS}
      />
    </div>
  );
};

export default MenuRight;

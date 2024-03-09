import { useDispatch, useSelector } from "react-redux";
import { setIsChatBoxOpen, setReceptId } from "../../../hook/ChatBoxSlice";
import {
  API_ACCEPT_REQUEST,
  API_GET_LIST_FRIENDS,
  API_GET_REQUESTS,
} from "../../../service/Community/fetchCommunity";
import List from "../../Layout/List";
import "./style.scss";
import { MenuRightProps } from "./type";
import { RootState } from "../../../hook/rootReducer";

const MenuRight: React.FC<MenuRightProps> = () => {
  const dispatch = useDispatch();
  const isChatBoxOpen = useSelector(
    (state: RootState) => state.chatBox.isChatBoxOpen
  );

  const handleOpenReceptMessage = (data: object) => {
    dispatch(setReceptId(data));
    dispatch(setIsChatBoxOpen(!isChatBoxOpen));
  };

  return (
    <div className="flex flex-col h-screen justify-start gap-2">
      <List
        title="Requests"
        API_GET_DATA={API_GET_REQUESTS}
        wrapVariant="max-basis-[50%]"
        typeList="requestsList"
        API_HANDLE_EVENT={API_ACCEPT_REQUEST}
      />
      <List
        title="List friends"
        API_GET_DATA={API_GET_LIST_FRIENDS}
        wrapVariant="max-basis-[50vh]"
        typeList="friendsList"
        API_HANDLE_EVENT={API_GET_REQUESTS}
        handleOpenReceptMessage={handleOpenReceptMessage}
      />
    </div>
  );
};

export default MenuRight;

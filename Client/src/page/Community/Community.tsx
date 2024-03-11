import List from "../../component/Layout/List";
import { useChatBox } from "../../hook/UseChatBox";
import {
  API_USER_ADD_FRIEND,
  API_USER_GET_ALL_USERS,
} from "../../service/Community/fetchCommunity";

const Community: React.FC = () => {
  const { handleOpenReceptMessage } = useChatBox();

  return (
    <div className="flex flex-row w-screen py-24 w-">
      <div className="basis-[20%]" id="nav-left"></div>
      <div className="flex-1 flex flex-col justify-start items-center w-full md:w-8/12">
        <List
          title="Find new friends..."
          API_GET_DATA={API_USER_GET_ALL_USERS}
          API_HANDLE_EVENT_1={API_USER_ADD_FRIEND}
          API_HANDLE_EVENT_2={API_USER_ADD_FRIEND}
          handleOpenReceptMessage={handleOpenReceptMessage}
          typeList="communityList"
        />
      </div>
      <div className="basis-[20%] right-[20vw]"></div>
    </div>
  );
};

export default Community;

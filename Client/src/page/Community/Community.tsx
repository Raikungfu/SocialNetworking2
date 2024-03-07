import List from "../../component/Layout/List";
import {
  API_USER_ADD_FRIEND,
  API_USER_GET_ALL_USERS,
} from "../../service/Community/fetchCommunity";

const Community: React.FC = () => {
  return (
    <div className="flex flex-row w-screen py-24">
      <div className="basis-[20%]" id="nav-left"></div>
      <div className="flex-1 flex flex-col justify-start items-center w-full md:w-8/12">
        <List
          title="Find new friends..."
          API_GET_DATA={API_USER_GET_ALL_USERS}
          API_HANDLE_EVENT={API_USER_ADD_FRIEND}
          typeList="communityList"
        />
      </div>
      <div className="basis-[20%] right-[20vw]"></div>
    </div>
  );
};

export default Community;

import GroupButton from "../GroupElement/GroupButton";
import Img from "../Img";
import { ListProps, User } from "./type";
import logo from "../../../assets/img/logoAvt.jpeg";
import { API_USER_GET_ALL_USERS } from "../../../service/Community/fetchCommunity";
import { useState } from "react";
import InfiniteScroll from "react-infinite-scroller";

const List: React.FC<ListProps> = () => {
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const loadMore = async (page: number) => {
    const response = await API_USER_GET_ALL_USERS({ page });
    if (response) {
      const data = response as unknown as User[];
      setAllUsers((prevAllUsers) => [...prevAllUsers, ...data]);
    }
  };

  return (
    <div className="w-10/12">
      <div className="flex items-center justify-between mb-4">
        <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
          Find New Friends
        </h5>
        <a
          href="#"
          className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
        >
          View all
        </a>
      </div>
      <div className="flow-root">
        <ul
          role="list"
          className="divide-y divide-gray-200 dark:divide-gray-700"
        >
          <InfiniteScroll
            hasMore={true}
            initialLoad={true}
            isReverse={false}
            loadMore={loadMore}
            pageStart={0}
            threshold={250}
            useCapture={false}
            useWindow={true}
            loader={<>Loading....</>}
            className="w-full"
          >
            {allUsers.map((item) => (
              <li className="py-3 sm:py-4">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Img alt="avt-user" src={item.avt || logo} variant="avt" />
                  </div>
                  <div className="flex-1 min-w-0 ms-4">
                    <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                      {item.name ? item.name : item.username}
                    </p>
                    <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                      {item.gender ? item.gender : "unknown"}
                    </p>
                  </div>
                  <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                    <GroupButton
                      id={""}
                      buttonClassName="py-1 px-2 rounded-full bg-red-400 text-white"
                      buttons={[
                        {
                          id: "add-friend-btn",
                          label: "Add Friend",
                        },
                        {
                          id: "message-btn",
                          label: "Message",
                        },
                      ]}
                      variant={"flex flex-row gap-2"}
                    />
                  </div>
                </div>
              </li>
            ))}
          </InfiniteScroll>
        </ul>
      </div>
    </div>
  );
};

export default List;

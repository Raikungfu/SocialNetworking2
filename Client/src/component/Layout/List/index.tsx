import GroupButton from "../GroupElement/GroupButton";
import Img from "../Img";
import { ListProps, User } from "./type";
import logo from "../../../assets/img/logoAvt.jpeg";
import { useState } from "react";
import InfiniteScroll from "react-infinite-scroller";
import ChatBubbleIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";

const List: React.FC<ListProps> = (props) => {
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const API_GET_DATA = props.API_GET_DATA;
  const loadMore = async (page: number) => {
    const response = await API_GET_DATA({ page });
    if (response) {
      const data = response as unknown as User[];
      data.length > 0
        ? setAllUsers((prevAllUsers) => [...prevAllUsers, ...data])
        : setHasMore(false);
    }
  };

  return (
    <div className="w-full max-h-40 overflow-y-auto">
      <div className="w-full flex items-center justify-between mb-4  overflow-y-hidden">
        <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
          {props.title}
        </h5>
        <a
          href="#"
          className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
        >
          View all
        </a>
      </div>
      <div className={props.wrapVariant}>
        <ul role="list" className="w-10/12">
          <InfiniteScroll
            hasMore={hasMore}
            initialLoad={true}
            isReverse={false}
            loadMore={loadMore}
            pageStart={0}
            threshold={250}
            useCapture={false}
            useWindow={true}
            loader={<></>}
            className="divide-y divide-gray-200 dark:divide-gray-700"
          >
            {allUsers.map((item) => (
              <li className="py-3 sm:py-4">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Img
                      alt="avt-user"
                      src={item.friend?.avt || item.avt || logo}
                      variant="avt"
                    />
                  </div>
                  <div className="flex-1 min-w-0 ms-4">
                    <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                      {item.friend?.name ||
                        item.friend?.username ||
                        item.name ||
                        item.username}
                    </p>
                    <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                      {item.gender || item.friend?.gender || "unknown"}
                    </p>
                  </div>
                  <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                    {props.typeList === "communityList" ? (
                      <GroupButton
                        id={""}
                        buttonClassName="py-1 px-2 rounded-full bg-red-400 text-white"
                        buttons={[
                          {
                            id: "add-friend-btn",
                            label: "Add Friend",
                            onClick: () =>
                              props.API_HANDLE_EVENT({ friendId: item._id }),
                          },
                          {
                            id: "message-btn",
                            label: "Message",
                          },
                        ]}
                        variant={"flex flex-row gap-2"}
                      />
                    ) : props.typeList === "friendsList" ? (
                      <GroupButton
                        id={""}
                        buttonClassName="w-full rounded-full bg-red-400 p-1 text-white flex flex-row justify-between"
                        buttons={[
                          {
                            id: "open-message-btn",
                            children: <ChatBubbleIcon />,
                          },
                        ]}
                        variant={"flex flex-row gap-1"}
                      />
                    ) : (
                      <GroupButton
                        id={""}
                        buttonClassName="w-full rounded-full bg-red-400 p-1 text-white flex flex-row justify-between"
                        buttons={[
                          {
                            id: "accept-request-btn",
                            children: <CheckIcon />,
                            onClick: () =>
                              props.API_HANDLE_EVENT({ friendId: item._id }),
                          },
                          {
                            id: "reject-request-btn",
                            children: <CloseIcon />,
                            onClick: () =>
                              props.API_HANDLE_EVENT({ friendId: item._id }),
                          },
                        ]}
                        variant={"flex flex-row gap-1"}
                      />
                    )}
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

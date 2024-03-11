import GroupButton from "../GroupElement/GroupButton";
import Img from "../Img";
import { ListProps, User } from "./type";
import logo from "../../../assets/img/logoAvt.jpeg";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroller";
import ChatBubbleIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
import { Link } from "react-router-dom";

const List: React.FC<ListProps> = (props) => {
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [numberNewRecord, setNumberNewRecord] = useState(0);
  const API_GET_DATA = props.API_GET_DATA;
  const loadMore = async (page: number) => {
    const response = await API_GET_DATA({ page, numberNewRecord });

    if (response) {
      const data = response as unknown as User[];
      data && data.length > 0
        ? setAllUsers((prevAllUsers) => [...prevAllUsers, ...data])
        : setHasMore(false);
    }
  };

  const handleRequestAccept = (item: User) => {
    setAllUsers(allUsers.filter((user) => user._id !== item._id));
    setNumberNewRecord(numberNewRecord - 1);
    if (props.removeRecord) props.removeRecord(item);
  };

  useEffect(() => {
    if (props.newRecord) {
      setAllUsers((prev) => [props.newRecord as User, ...prev]);
      setNumberNewRecord(numberNewRecord + 1);
    }
  }, [numberNewRecord, props.newRecord]);

  const groupButton = (item: User) => {
    switch (props.typeList) {
      case "communityList":
        return (
          <GroupButton
            id={""}
            buttonClassName="py-1 px-2 rounded-full bg-red-400 text-white"
            buttons={[
              {
                id: "add-friend-btn",
                label: "Add Friend",
                onClick: () => {
                  if (props.API_HANDLE_EVENT_1) {
                    props.API_HANDLE_EVENT_1({ friendId: item._id });
                    handleRequestAccept(item);
                  }
                },
              },
              {
                id: "message-btn",
                label: "Message",
                onClick: () => {
                  if (props.handleOpenReceptMessage)
                    props.handleOpenReceptMessage({
                      id: item._id,
                      name: item.name,
                      avt: item.avt,
                    });
                },
              },
            ]}
            variant={"flex flex-row gap-2"}
          />
        );
      case "friendsList":
        return (
          <GroupButton
            id={""}
            buttonClassName="w-full rounded-full bg-red-400 p-1 text-white flex flex-row justify-between"
            buttons={[
              {
                id: "open-message-btn",
                childrencomp: <ChatBubbleIcon />,
              },
            ]}
            variant={"flex flex-row gap-1"}
          />
        );
      default:
        return (
          <GroupButton
            id={""}
            buttonClassName="w-full rounded-full bg-red-400 p-1 text-white flex flex-row justify-between"
            buttons={[
              {
                id: "accept-request-btn",
                childrencomp: <CheckIcon />,
                onClick: () => {
                  if (props.API_HANDLE_EVENT_1) {
                    props.API_HANDLE_EVENT_1({ friendId: item._id });
                    handleRequestAccept(item);
                  }
                },
              },
              {
                id: "reject-request-btn",
                childrencomp: <CloseIcon />,
                onClick: () => {
                  if (props.API_HANDLE_EVENT_2)
                    props.API_HANDLE_EVENT_2({ friendId: item._id });
                },
              },
            ]}
            variant={"flex flex-row gap-1"}
          />
        );
    }
  };

  return (
    <div className={props.wrapVariant + " w-full"}>
      <div className="w-full flex items-center justify-between mb-4 overflow-y-hidden">
        <h5 className="text-xl font-bold leading-none text-gray-900 dark:gray-900">
          {props.title}
        </h5>
        <Link
          to="/"
          className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
        >
          See all
        </Link>
      </div>
      <div className="overflow-y-auto">
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
            {allUsers.map((item, index) => (
              <li
                className="py-3 sm:py-4 cursor-pointer"
                key={`${props.title}_${index}`}
                onClick={() => {
                  if (props.handleOpenReceptMessage)
                    props.handleOpenReceptMessage({
                      id: item.id || item._id,
                      name: item.name,
                      avt: item.avt,
                    });
                }}
              >
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Img alt="avt-user" src={item.avt || logo} variant="avt" />
                  </div>
                  <div className="flex-1 min-w-0 ms-4">
                    <p
                      className={`${
                        item.online ? "text-green-500" : "text-red-500"
                      } text-sm font-medium truncate dark:gray-900`}
                    >
                      {item.name}
                    </p>
                  </div>
                  <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:gray-900">
                    {groupButton(item)}
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

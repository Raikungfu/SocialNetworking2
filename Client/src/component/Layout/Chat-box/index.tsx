import Button from "../Button";
import ChatIcon from "@mui/icons-material/TextsmsOutlined";
import CloseIcon from "@mui/icons-material/CloseOutlined";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../hook/rootReducer";
import { setIsChatBoxOpen, setReceptId } from "../../../hook/ChatBoxSlice";
import Img from "../Img";
import avt from "../../../assets/img/logoAvt.jpeg";
import Chat from "./Chat";
import SearchAndCreateChat from "./SearchAndCreate";
import { clickUser, searchUser } from "../List/ListDropdown/type";
import debounce from "debounce";
import { useState, ChangeEvent } from "react";
import { API_USER_CREATE_GROUP } from "../../../service/Chat/chatGroup";
import { API_SEARCH_USERS } from "../../../service/Search/SearchUser";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import socket from "../../../config/socketIO";

const ChatBox: React.FC = () => {
  const dispatch = useDispatch();
  const isChatBoxOpen = useSelector(
    (state: RootState) => state.chatBox.isChatBoxOpen
  );

  const chatWith = useSelector((state: RootState) => state.chatBox.recept);
  const [listUserGroup, setListUserGroup] = useState<clickUser[]>([]);
  const [listSearch, setListSearch] = useState<searchUser>();

  const openChatBox = () => {
    dispatch(setReceptId(null));
    dispatch(setIsChatBoxOpen(!isChatBoxOpen));
  };

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const data = event.target.value;
    const res = debounce(async () => {
      if (data && data === event.target.value) {
        const res = (await API_SEARCH_USERS({
          data,
        })) as unknown as searchUser;
        setListSearch(res);
      }
    }, 300);
    res();
  };

  const handleInputChange = () => {
    const data = chatWith?.id;
    socket.emit("individual:typing", data);
  };

  const handleError = (error: string) => {
    console.log(error);
  };

  const handleClickUserSeach = (data: clickUser) => {
    if (listUserGroup && !listUserGroup.some((user) => user.id === data.id)) {
      setListUserGroup((prev) => [...prev, data]);
    }
    console.log(listUserGroup);
  };

  const handleCreateGroup = async () => {
    const listUserSend = listUserGroup.map((user) => user.id);
    const res = await API_USER_CREATE_GROUP({
      listUsers: listUserSend,
    });
    console.log(res);
  };

  return (
    <>
      <div className="fixed bottom-0 right-0 mb-4 mr-4">
        <Button
          id={"bubble-chat"}
          childrencomp={<ChatIcon />}
          className="z-20 bg-red-500 rounded-3xl py-2 px-3 text-white flex flex-col shrink-0 grow-0 justify-around 
                  fixed bottom-0 right-5
                  mr-1 mb-5 lg:mr-5 lg:mb-5 xl:mr-10 xl:mb-10"
          onClick={openChatBox}
        />
      </div>
      {isChatBoxOpen && (
        <div id="chat-container" className={`fixed bottom-24 right-8 w-96`}>
          <div className="bg-white shadow-md rounded-lg max-w-lg w-full">
            <div className="p-4 border-b bg-red-400 text-white rounded-t-lg flex justify-between items-center">
              <div className="flex flex-row gap-2">
                <Img src={chatWith?.avt || avt} variant="avt" />
                <p className="text-lg font-semibold">
                  {" "}
                  {chatWith?.name ?? "Chat with ..."}
                </p>
              </div>
              <Button
                id={"close-chat"}
                childrencomp={<CloseIcon />}
                className="text-gray-300 hover:text-gray-400 focus:outline-none focus:text-gray-400"
                onClick={() => dispatch(setIsChatBoxOpen(false))}
              />
            </div>

            {chatWith ? (
              <Chat
                formInput={{
                  formVariant: "w-full p-4 flex flex-row items-center",
                  inputVariant:
                    "w-full px-3 py-2 border focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-e-full",
                  input: [
                    {
                      types: "text",
                      id: "content",
                      placeholder: "message....",
                      wrapInputVariant: "w-full",
                    },
                    {
                      id: "chat-attach-file-input",
                      types: "file",
                      inputVariant: "sr-only",
                      accept: "image/*, video/*",
                      multiple: true,
                      children: (
                        <Button
                          id={"chat-attach-file-btn"}
                          childrencomp={
                            <AttachFileIcon className="p-1 rounded-full text-white bg-red-600 m-1 absolute  right-28 bottom-5" />
                          }
                          type="button"
                          onClick={() =>
                            document
                              .getElementById("chat-attach-file-input")
                              ?.click()
                          }
                        />
                      ),
                    },
                  ],
                  onSubmitFail: handleError,
                  onInputChange: handleInputChange,
                  id: "chat-box",
                  buttonVariant:
                    "rounded-full text-white bg-red-600 absolute right-4 bottom-4",
                }}
              />
            ) : (
              <SearchAndCreateChat
                showList={{
                  wrapShowListVariant:
                    "max-h-20 flex flex-row flex-wrap overflow-y-auto",
                  wrapChildVariant:
                    "flex flex-row items-center rounded-full bg-gray-50 p-1 gap-2 text-xs text-[#121212ad] font-semibold",
                  listUser: listUserGroup,
                  button: <CloseIcon />,
                }}
                searchList={{
                  wrapVariant:
                    "relative flex flex-row justify-end items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse",
                  wrapDropdownVariant:
                    "w-full flex flex-col w-48 z-50 py-2 px-5 top-2 right-0 text-xs absolute list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600",
                  wrapDropdownChildVariant:
                    "py-3 sm:py-4 cursor-pointer flex flex-row items-center gap-2",
                  wrapTextChildVariant:
                    "text-sm font-medium dark:gray-900 truncate",
                  wrapTextChildColorVariant_1: "text-gray-800",
                  searchUser: listSearch,
                  handleOpenReceptMessage: handleClickUserSeach,
                }}
                formInput={{
                  formVariant: "w-full p-4 flex flex-row items-center",
                  inputVariant:
                    "w-full px-3 py-2 border focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-e-full",
                  input: [
                    {
                      types: "text",
                      id: "content",
                      placeholder: "Search...",
                      wrapInputVariant: "w-full",
                    },
                    {
                      id: "chat-attach-file-input",
                      types: "file",
                      inputVariant: "sr-only",
                      accept: "image/*, video/*",
                      multiple: true,
                      children: (
                        <Button
                          id={"chat-attach-file-btn"}
                          childrencomp={
                            <AttachFileIcon className="p-1 rounded-full text-white bg-red-600 m-1 absolute  right-28 bottom-5" />
                          }
                          type="button"
                          onClick={() =>
                            document
                              .getElementById("chat-attach-file-input")
                              ?.click()
                          }
                        />
                      ),
                    },
                  ],
                  onSubmitSuccess: handleCreateGroup,
                  onSubmitFail: handleError,
                  onChange: handleSearch,
                  id: "search-chat-box",
                  buttonVariant:
                    "rounded-full text-white bg-red-600 absolute right-4 bottom-4",
                }}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBox;

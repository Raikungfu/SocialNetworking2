import React, { useState, useEffect } from "react";
import logo from "../../assets/img/avtLogo.jpg";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../hook/UserSlice";
import { RootState } from "../../hook/rootReducer";
import Button from "../Layout/Button";
import Dropdown from "../Layout/Dropdown";
import Img from "../Layout/Img";
import { Link, useNavigate } from "react-router-dom";
import GroupElement from "../Layout/GroupElement";
import ChatGroupIcon from "@mui/icons-material/ForumOutlined";
import ChatIndividualIcon from "@mui/icons-material/ChatOutlined";
import ListDropdown from "../Layout/List/ListDropdown/ListDropdown";
import { useChatBox } from "../../hook/UseChatBox";
import { resetRoom } from "../../hook/ChatRoomSlice";
import { clickUser } from "../Layout/List/ListDropdown/type";

const HeaderRight: React.FC = () => {
  const dispatch = useDispatch();
  const nav = useNavigate();
  const initialState = useSelector((state: RootState) => state.user.userState);
  const [state, setState] = useState<boolean>(initialState.state === "active");
  const [isChatGroupOpen, setIsChatGroupOpen] = useState<boolean>(false);
  const allChatIndividualsInitial = useSelector(
    (state: RootState) => state.chatRoom.chatRoomIndividual
  );

  const allChatGroupsInitial = useSelector(
    (state: RootState) => state.chatRoom.chatRoomGroup
  );
  const [allChatIndividuals, setAllChatIndividuals] = useState(
    allChatIndividualsInitial
  );

  const [allChatGroups, setAllChatGroups] = useState(allChatGroupsInitial);

  useEffect(() => {
    setAllChatIndividuals(allChatIndividualsInitial);
  }, [allChatIndividualsInitial]);

  useEffect(() => {
    setAllChatGroups(allChatGroupsInitial);
  }, [allChatGroupsInitial]);

  const [isChatIndividualOpen, setIsChatIndividualOpen] =
    useState<boolean>(false);
  const [isProfileOpen, setIsProfileOpen] = useState<boolean>(false);

  const toggleDropdown = (data: string) => {
    switch (data) {
      case "chat-group":
        setIsChatGroupOpen(!isChatGroupOpen);
        setIsChatIndividualOpen(false);
        setIsProfileOpen(false);
        break;
      case "chat-individual":
        setIsChatGroupOpen(false);
        setIsChatIndividualOpen(!isChatIndividualOpen);
        setIsProfileOpen(false);
        break;
      case "profile":
        setIsChatGroupOpen(false);
        setIsChatIndividualOpen(false);
        setIsProfileOpen(!isProfileOpen);
        break;
      default:
        setIsChatGroupOpen(false);
        setIsChatIndividualOpen(false);
        setIsProfileOpen(false);
    }
  };

  useEffect(() => {
    setState(initialState.state === "active");
  }, [initialState.state]);

  const handleLogout = () => {
    dispatch(logoutUser());
    dispatch(resetRoom());
    nav("/login");
  };

  const { handleOpenReceptMessage, handleOpenGroupMessage } = useChatBox();

  return state ? (
    <div className="flex flex-row justify-end gap-2">
      <Dropdown
        variant={"drop-down"}
        id={"chat-group"}
        childrencomp={
          <ListDropdown
            wrapVariant="relative flex flex-row justify-end items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse"
            wrapDropdownVariant="max-h-48 overflow-y-auto flex flex-col w-96 z-50 py-2 px-5 top-2 right-0 text-base absolute list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600"
            wrapDropdownChildVariant="py-3 sm:py-4 cursor-pointer flex flex-row items-center gap-3"
            wrapTextChildVariant="text-base font-medium dark:gray-900 truncate"
            wrapTextChildColorVariant_1="text-green-500"
            wrapTextChildColorVariant_2="text-red-500"
            listUserRecord={allChatGroups}
            handleOpenReceptMessage={(data: clickUser) => {
              handleOpenGroupMessage(data);
              toggleDropdown("");
            }}
          />
        }
        navLinkAvt={<ChatGroupIcon />}
        navHeaderClassName={
          "flex text-sm bg-red-500 text-white rounded-full md:me-0 p-1 focus:ring-5 focus:ring-gray-300 dark:focus:ring-white-600"
        }
        handleOpenDropdown={toggleDropdown}
        isOpen={isChatGroupOpen}
      />
      <Dropdown
        variant={"drop-down"}
        id={"chat-individual"}
        navLinkAvt={<ChatIndividualIcon />}
        childrencomp={
          <ListDropdown
            wrapVariant="relative flex flex-row justify-end items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse"
            wrapDropdownVariant="max-h-48 overflow-y-auto flex flex-col w-60 z-50 py-2 px-5 top-2 right-0 text-base absolute list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600"
            wrapDropdownChildVariant="py-3 sm:py-4 cursor-pointer flex flex-row items-center gap-3"
            wrapTextChildVariant="text-base font-medium dark:gray-900 truncate"
            wrapTextChildColorVariant_1="text-green-500"
            wrapTextChildColorVariant_2="text-red-500"
            listUserRecord={allChatIndividuals}
            handleOpenReceptMessage={(data: clickUser) => {
              handleOpenReceptMessage(data);
              toggleDropdown("");
            }}
          />
        }
        navHeaderClassName={
          "flex text-sm bg-red-500 text-white rounded-full md:me-0 p-1 focus:ring-5 focus:ring-gray-300 dark:focus:ring-white-600"
        }
        handleOpenDropdown={toggleDropdown}
        isOpen={isChatIndividualOpen}
      />
      <Dropdown
        className={
          "relative flex flex-row justify-end items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse"
        }
        variant={"drop-down"}
        id={"profile"}
        wrapDropdownListVariant={
          "flex flex-col z-50 py-2 px-2 w-40 top-10 text-base absolute list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600"
        }
        navLinkAvt={
          <Img
            src={initialState.avt ? initialState.avt : logo}
            variant={"avt"}
          />
        }
        navLinkIcon={[
          {
            link: `profile/${initialState.id}`,
            label: `${initialState.name ? initialState.name : "User"}`,
            icon: (
              <Img
                src={initialState.avt ? initialState.avt : logo}
                variant={"avt"}
              />
            ),
          },
          {
            label: "Logout",
            onClick: handleLogout,
          },
        ]}
        navHeaderClassName={
          "flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
        }
        wrapDropdownChildVariant="flex flex-row p-2 gap-2 w-36"
        handleOpenDropdown={toggleDropdown}
        isOpen={isProfileOpen}
      />
    </div>
  ) : (
    <div>
      <GroupElement
        childrencomp={[
          <Link key={"log-btn"} to={`/login`} id={""} className="access-link">
            <Button
              id={"login-btn"}
              variant={"accept-link-button"}
              type={"button"}
              label="Login"
              className="dark:text-white text-xs md:text-lg sm:text-base py-2.5 px-1.5 sm:px-3 md:px-5"
            />
          </Link>,
          <Link
            key={"reg-btn"}
            to={"/register"}
            id={""}
            className={"access-link"}
          >
            <Button
              id={"login-btn"}
              variant={"accept-link-button"}
              type={"button"}
              label="Register"
              className="dark:text-white text-xs md:text-lg sm:text-base py-2.5 px-1.5 sm:px-3 md:px-5"
            />
          </Link>,
        ]}
        variant={"flex flex-row justify-end font-medium gap-x-1.5 basis-[20%]"}
      ></GroupElement>
    </div>
  );
};

export default HeaderRight;

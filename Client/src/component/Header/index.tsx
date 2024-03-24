import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import HeaderRight from "./HeaderRight";
import Nav from "../Layout/Nav-bar";
import HomeIcon from "@mui/icons-material/Home";
import CommunityIcon from "@mui/icons-material/Groups";
import ChatIcon from "@mui/icons-material/QuestionAnswer";
import AboutIcon from "@mui/icons-material/Info";
import MeetingIcon from "@mui/icons-material/VideoCall";
import HeaderLeft from "./HeaderLeft";
import ChatBox from "../Layout/Chat-box";
import socket from "../../config/socketIO";
import Popup from "../Layout/PopupNotification";
import { MessageNoti } from "../../type/Socket/User";
import "../../type/Style/HeaderStyle.scss";
import MenuIcon from "@mui/icons-material/Menu";
import DropdownMenu from "../Layout/Dropdown";

const Header: React.FC = () => {
  const [popupComponents, setPopupComponents] = useState<JSX.Element[]>([]);
  const [isNavOpen, setIsNavOpen] = useState<boolean>(false);
  useEffect(() => {
    const handleNoti = (res: MessageNoti) => {
      let newPopupComponent = <></>;
      switch (res.type) {
        case "info": {
          newPopupComponent = (
            <Popup
              key={res._id}
              information={res.information}
              message={res.message}
              img={res.avt}
              wrapPopupVariant={
                "z-50 flex flex-row bg-slate-100 border-t border-b border-slate-500 text-slate-500 px-4 py-3 gap-2 min-w-0"
              }
              variantMessage={"flex flex-col truncate"}
            />
          );
          break;
        }

        case "active": {
          newPopupComponent = (
            <Popup
              key={res._id}
              information={res.information}
              message={res.message}
              img={res.avt}
              wrapPopupVariant={
                "z-50 flex flex-row bg-green-100 border-t border-b border-green-500 text-green-700 px-4 py-3 gap-2 min-w-0"
              }
              variantMessage={"flex flex-col truncate"}
            />
          );
          break;
        }

        case "error": {
          newPopupComponent = (
            <Popup
              key={res._id}
              information={res.information}
              message={res.message}
              img={res.avt}
              wrapPopupVariant={
                "z-50 flex flex-row bg-green-100 border-t border-b border-green-500 text-green-700 px-4 py-3 gap-2 min-w-0"
              }
              variantMessage={"flex flex-col truncate"}
            />
          );
          break;
        }
        case "warning": {
          newPopupComponent = (
            <Popup
              key={res._id}
              information={res.information}
              message={res.message}
              img={res.avt}
              wrapPopupVariant={
                "z-50 flex flex-row bg-green-100 border-t border-b border-green-500 text-green-700 px-4 py-3 gap-2 min-w-0"
              }
              variantMessage={"flex flex-col truncate"}
            />
          );
          break;
        }
      }
      setPopupComponents((prevComponents) => [
        ...prevComponents,
        newPopupComponent,
      ]);
    };

    socket.on("noti", handleNoti);

    return () => {
      socket.off("noti", handleNoti);
    };
  }, []);

  return (
    <div className="App">
      <header className="App-header shadow-md bg-white dark:bg-slate-950 dark:text-white w-full fixed z-50 py-2">
        <nav className="flex flex-row justify-between items-center px-2 sm:px-7 md:px-10 py-2">
          <div className="basis-[40%] md:basis-[20%]">
            <HeaderLeft />
          </div>
          <DropdownMenu
            handleOpenDropdown={() => setIsNavOpen(!isNavOpen)}
            navLinkAvt={<MenuIcon />}
            childrencomp={
              <Nav
                id="nav-header"
                wrapNavVariant={
                  "absolute font-light cursor-pointer flex-1 flex flex-col justify-around bg-white rounded-lg"
                }
                wrapChildVariant={
                  "flex flex-row gap-3 hover:bg-[#827d7d21] hover:dark:bg-white hover:bg-opacity-30 border-red-500 rounded-lg px-4 py-3"
                }
                navContext={{
                  navChild: [
                    {
                      link: "/",
                      icon: <HomeIcon />,
                      id: "dashboard",
                      context: "Home",
                    },
                    {
                      link: "/community",
                      icon: <CommunityIcon />,
                      id: "community",
                      context: "Community",
                    },
                    {
                      link: "/meetings",
                      icon: <MeetingIcon />,
                      id: "meetings",
                      context: "Meetings",
                    },
                    {
                      link: "/chat",
                      icon: <ChatIcon />,
                      id: "chat",
                      context: "Chat",
                    },
                    {
                      link: "/about",
                      icon: <AboutIcon />,
                      id: "about",
                      context: "About",
                    },
                  ],
                }}
              />
            }
            isOpen={isNavOpen}
            variant={"drop-down"}
            id={"header-drop-down-menu"}
            className="hidden"
            navHeaderClassName={""}
          />
          <div
            id="header-center"
            className="grow flex flex-row justify-start items-center"
          >
            <Nav
              id="nav-header"
              wrapNavVariant={
                "font-light cursor-pointer flex-1 flex flex-row justify-around"
              }
              wrapChildVariant={
                "hover:bg-[#827d7d21] hover:dark:bg-white hover:bg-opacity-30 border-red-500 rounded-x rounded-lg px-1 py-2 md:px-5 lg:px-8"
              }
              navContext={{
                navChild: [
                  { link: "/", icon: <HomeIcon />, id: "dashboard" },
                  {
                    link: "/community",
                    icon: <CommunityIcon />,
                    id: "community",
                  },
                  { link: "/meetings", icon: <MeetingIcon />, id: "meetings" },
                  { link: "/chat", icon: <ChatIcon />, id: "chat" },
                  { link: "/about", icon: <AboutIcon />, id: "about" },
                ],
              }}
            />
          </div>
          <div className="basis-[30%] md:basis-[20%]">
            <HeaderRight />
          </div>
        </nav>
      </header>
      <Outlet />
      <ChatBox />
      <div className="fixed z-50 bottom-10 left-10">
        {popupComponents.map((Popup) => Popup)}
      </div>
    </div>
  );
};

export default Header;

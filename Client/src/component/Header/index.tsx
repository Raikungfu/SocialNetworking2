import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import HeaderRight from "./HeaderRight";
import Nav from "../Layout/Nav-bar";
import HomeIcon from "@mui/icons-material/Home";
import CommunityIcon from "@mui/icons-material/Groups";
import ChatIcon from "@mui/icons-material/QuestionAnswer";
import AboutIcon from "@mui/icons-material/Info";
import FeedIcon from "@mui/icons-material/Feed";
import HeaderLeft from "./HeaderLeft";
import ChatBox from "../Layout/Chat-box";
import socket from "../../config/socketIO";
import Popup from "../Layout/PopupNotification";
import { MessageNoti } from "../../type/Socket/User";

const Header: React.FC = () => {
  const [popupComponents, setPopupComponents] = useState<JSX.Element[]>([]);

  useEffect(() => {
    const handleNoti = (res: MessageNoti) => {
      let newPopupComponent = <></>;
      switch (res.type) {
        case "friend-online": {
          newPopupComponent = (
            <Popup
              key={res._id}
              information={`Best friend online`}
              message={`Best friend <strong>${res.name}</strong> online. Message now....`}
              avt={res.avt}
              wrapPopupVariant={
                "z-50 flex flex-row bg-green-100 border-t border-b border-green-500 text-green-700 px-4 py-3 gap-2 min-w-0"
              }
              variantMessage={"flex flex-col truncate"}
            />
          );
          break;
        }

        case "message-individual": {
          newPopupComponent = (
            <Popup
              key={res._id}
              information={`New message from ${res.name}`}
              message={`Content: ${res.message}`}
              wrapPopupVariant={
                "z-50 flex flex-row bg-green-100 border-t border-b border-green-500 text-green-700 px-4 py-3 gap-2 min-w-0"
              }
              variantMessage={"flex flex-col truncate"}
            />
          );
          break;
        }
        case "message-group": {
          newPopupComponent = (
            <Popup
              key={res._id}
              information={`Room ${res.roomName} have new message from ${res.name}`}
              message={`Content: ${res.message}`}
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

  // useEffect(() => {
  //   if (newMessage) {
  //     const newPopupComponent =
  //       chatType === "individual" ? (
  //         <Popup
  //           key={newMessage?._id}
  //           information={`New Message from <strong>${newMessage?.sender}</strong>.`}
  //           message={`${newMessage?.content}`}
  //           wrapPopupVariant={
  //             "z-50 flex flex-row bg-green-100 border-t border-b border-green-500 text-green-700 px-4 py-3 gap-2 min-w-0"
  //           }
  //           variantMessage={"flex flex-col truncate"}
  //         />
  //       ) : (
  //         <Popup
  //           key={newMessage?._id}
  //           information={`New Message from Room: <strong>${newMessage?.roomId}</strong>.`}
  //           message={`${newMessage?.content}`}
  //           wrapPopupVariant={
  //             "z-50 flex flex-row bg-green-100 border-t border-b border-green-500 text-green-700 px-4 py-3 gap-2 min-w-0"
  //           }
  //           variantMessage={"flex flex-col truncate"}
  //         />
  //       );

  //     setPopupComponents((prevComponents) => [
  //       ...prevComponents,
  //       newPopupComponent,
  //     ]);
  //   }
  // }, [newMessage]);

  return (
    <div className="App">
      <header className="App-header shadow-md bg-white dark:bg-slate-950 dark:text-white w-screen fixed z-50 py-2">
        <nav className="flex flex-row justify-between items-center px-2 sm:px-7 md:px-10">
          <div className="basis-[20%]">
            <HeaderLeft />
          </div>
          <div className=" grow flex flex-row justify-start items-center">
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
                  { link: "/feed", icon: <FeedIcon />, id: "feed" },
                  { link: "/chat", icon: <ChatIcon />, id: "chat" },
                  { link: "/about", icon: <AboutIcon />, id: "about" },
                ],
              }}
            />
          </div>
          <div className="basis-[20%]">
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

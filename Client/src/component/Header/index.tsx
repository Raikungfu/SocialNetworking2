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

const header: React.FC = () => {
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
    </div>
  );
};

export default header;

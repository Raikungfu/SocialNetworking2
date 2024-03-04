import { Outlet } from "react-router-dom";
import HeaderRight from "./HeaderRight";
import Img from "../Layout/Img";
import logo from "../../assets/img/logo.png";
import Nav from "../Layout/Nav-bar";
import HomeIcon from "@mui/icons-material/Home";
import GroupIcon from "@mui/icons-material/Groups";
import ChatIcon from "@mui/icons-material/QuestionAnswer";
import AboutIcon from "@mui/icons-material/Info";
import FeedIcon from "@mui/icons-material/Feed";

const header: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header shadow-md bg-white dark:bg-slate-950 dark:text-white w-screen fixed z-50 py-2">
        <nav className="flex flex-row justify-between items-center px-2 sm:px-7 md:px-10">
          <div className="basis-[20%] flex flex-row justify-start items-center">
            <Img src={logo} alt="logo-brand" variant="logo" />
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
                  { link: "/group", icon: <GroupIcon />, id: "group" },
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
    </div>
  );
};

export default header;

import Nav from "../../Layout/Nav-bar";
import GroupIcon from "@mui/icons-material/Diversity1TwoTone";
import FriendRequestIcon from "@mui/icons-material/GroupAddTwoTone";
import NewsIcon from "@mui/icons-material/NewspaperTwoTone";
import PagesIcon from "@mui/icons-material/DocumentScannerTwoTone";
import MarketIcon from "@mui/icons-material/StorefrontTwoTone";
import "./style.scss";

const MenuLeft: React.FC = () => {
  return (
    <Nav
      id="nav-menu-left"
      wrapNavVariant={
        "flex flex-col h-screen w-full justify-start md:pl-10 sm:pl-5"
      }
      wrapChildVariant={
        "flex flex-row gap-3 hover:bg-[#827d7d21] hover:dark:bg-white hover:bg-opacity-30 p-3 border-red-500 rounded-x rounded-lg pl-3 pr-3"
      }
      navContext={{
        className: "nav-left-title",
        navChild: [
          {
            link: "/group",
            icon: <GroupIcon />,
            id: "groups",
            context: "Groups",
            classColor: "text-red-500",
          },
          {
            link: "/friends-request",
            icon: <FriendRequestIcon />,
            id: "friends-request",
            context: "Friend Requests",
            classColor: "text-purple-500",
          },
          {
            link: "/news",
            icon: <NewsIcon />,
            id: "news",
            context: "News",
            classColor: "text-green-500",
          },
          {
            link: "/pages",
            icon: <PagesIcon />,
            id: "pages",
            context: "Pages",
            classColor: "text-blue-500",
          },
          {
            link: "/market",
            icon: <MarketIcon />,
            id: "market",
            context: "Market",
            classColor: "text-yellow-500",
          },
        ],
      }}
    />
  );
};

export default MenuLeft;

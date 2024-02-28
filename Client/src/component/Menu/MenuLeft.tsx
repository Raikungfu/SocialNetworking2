import Nav from "../../component/Layout/Nav-bar";
import GroupIcon from "@mui/icons-material/Diversity1TwoTone";
import FriendRequestIcon from "@mui/icons-material/GroupAddTwoTone";
import NewsIcon from "@mui/icons-material/NewspaperTwoTone";
import PagesIcon from "@mui/icons-material/DocumentScannerTwoTone";
import MarketIcon from "@mui/icons-material/StorefrontTwoTone";

const MenuLeft: React.FC = () => {
  return (
    <Nav
      wrapNavVariant={"flex flex-col h-screen w-[20vw] justify-start px-10"}
      wrapChildVariant={
        "flex flex-row gap-3 hover:bg-[#827d7d21] hover:dark:bg-white hover:bg-opacity-30 p-3 border-red-500 rounded-x rounded-lg pl-3 pr-3"
      }
      navContext={[
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
          context: "FriendRequests",
          classColor: "text-purple-500",
        },
        {
          link: "/news",
          icon: <NewsIcon />,
          id: "news",
          context: "news",
          classColor: "text-green-500",
        },
        {
          link: "/pages",
          icon: <PagesIcon />,
          id: "pages",
          context: "pages",
          classColor: "text-blue-500",
        },
        {
          link: "/market",
          icon: <MarketIcon />,
          id: "market",
          context: "market",
          classColor: "text-yellow-300",
        },
      ]}
    />
  );
};

export default MenuLeft;

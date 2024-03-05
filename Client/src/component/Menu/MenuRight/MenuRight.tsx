import Nav from "../../Layout/Nav-bar";
import "./style.scss";
import { MenuRightProps } from "./type";

const MenuRight: React.FC<MenuRightProps> = (props) => {
  return (
    <>
      <Nav
        label={"List Friends"}
        id={`${props.id}`}
        wrapNavVariant={
          "flex flex-col h-screen w-full justify-start md:pr-10 sm:pr-5"
        }
        wrapChildVariant={
          "flex flex-row gap-3 hover:bg-[#827d7d21] hover:dark:bg-white hover:bg-opacity-30 p-3 border-red-500 rounded-x rounded-lg pr-3 pl-3"
        }
        navContext={{
          navChild: [
            {
              id: "menu-right",
              link: "",
            },
          ],
        }}
      />
    </>
  );
};

export default MenuRight;

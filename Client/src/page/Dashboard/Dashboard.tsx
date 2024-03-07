import Content from "../../component/Content";
import MenuLeft from "../../component/Menu/MenuLeft/MenuLeft";
import MenuRight from "../../component/Menu/MenuRight/MenuRight";

const Dashboard = () => {
  return (
    <div className="flex flex-row w-screen py-20">
      <div className="basis-[20%]" id="nav-left">
        <MenuLeft />
      </div>
      <div className="flex-1 flex flex-col justify-start items-center">
        <Content />
      </div>
      <div className="basis-[20%] right-[20vw]">
        <MenuRight id={"menu-right-dashboard"} />
      </div>
    </div>
  );
};

export default Dashboard;

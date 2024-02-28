import Content from "../../component/Content";
import MenuLeft from "../../component/Menu/MenuLeft";

const Dashboard = () => {
  return (
    <div className="flex flex-row w-screen py-24">
      <div className="basis-[20%]">
        <MenuLeft />
      </div>
      <div className="flex-1 flex flex-col justify-start items-center">
        <Content />
      </div>
      <div className="basis-[20%] right-[20vw]"></div>
    </div>
  );
};

export default Dashboard;

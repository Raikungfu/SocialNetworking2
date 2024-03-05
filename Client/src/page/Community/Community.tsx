import List from "../../component/Layout/List";

const Community: React.FC = () => {
  return (
    <div className="flex flex-row w-screen py-24">
      <div className="basis-[20%]" id="nav-left"></div>
      <div className="flex-1 flex flex-col justify-start items-center">
        <List items={[]} />
      </div>
      <div className="basis-[20%] right-[20vw]"></div>
    </div>
  );
};

export default Community;

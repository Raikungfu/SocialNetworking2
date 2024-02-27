import { Outlet } from "react-router-dom";
import HeaderRight from "./HeaderRight";

const header: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header shadow-md bg-white dark:bg-slate-950 dark:text-white w-screen fixed z-50 py-2">
        <nav className="flex flex-row justify-between items-center px-10">
          <div className="basis-[20%] flex flex-row justify-start items-center"></div>
          <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            <HeaderRight />
          </div>
        </nav>
      </header>
      <Outlet />
    </div>
  );
};

export default header;

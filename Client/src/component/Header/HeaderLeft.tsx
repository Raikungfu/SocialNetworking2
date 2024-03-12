import Img from "../Layout/Img";
import logo from "../../assets/img/logo.png";
import Input from "../Layout/Input";
import { ChangeEvent } from "react";
import DropdownMenu from "../Layout/Dropdown";
import debounce from "debounce";
import { API_SEARCH_USERS } from "../../service/Search/SearchUser";

const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
  const data = event.target.value;
  const res = debounce(() => {
    if (data && data === event.target.value) {
      const res = API_SEARCH_USERS({ data });
      console.log(res);
    }
  }, 300);
  res();
};

const HeaderLeft: React.FC = () => {
  return (
    <>
      <Img src={logo} alt="logo-brand" variant="logo" />
      <Input
        labelVariant="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        label="Search"
        wrapInputVariant="relative"
        inputVariant="block w-full ps-2 py-1 text-sm text-gray-900 border border-gray-300 rounded-full bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Search..."
        id={"search-bar-header"}
        onChange={handleSearch}
        types={"text"}
      />
      <DropdownMenu
        variant={"drop-down"}
        id={"dropdown-sub"}
        navHeaderClassName={""}
      />
    </>
  );
};

export default HeaderLeft;

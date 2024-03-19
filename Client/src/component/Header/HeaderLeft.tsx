import Img from "../Layout/Img";
import logo from "../../assets/img/logo.png";
import Input from "../Layout/Input";
import { ChangeEvent, useState } from "react";
import debounce from "debounce";
import { API_SEARCH_USERS } from "../../service/Search/SearchUser";
import Dropdown from "../Layout/Dropdown";
import ListDropdown from "../Layout/List/ListDropdown/ListDropdown";
import { searchUser } from "../Layout/List/ListDropdown/type";

const HeaderLeft: React.FC = () => {
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>();
  const [listSearch, setListSearch] = useState<searchUser>();
  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const data = event.target.value;
    const res = debounce(async () => {
      if (data && data === event.target.value) {
        const res = (await API_SEARCH_USERS({
          data,
        })) as unknown as searchUser;
        setListSearch(res);
        setIsSearchOpen(true);
      }
    }, 300);
    res();
  };
  return (
    <div
      // onMouseLeave={() => setIsSearchOpen(false)}
      className="flex flex-row justify-start items-center gap-4"
    >
      <Img src={logo} alt="logo-brand" variant="logo" />
      <Input
        labelVariant="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        wrapInputVariant="relative"
        inputVariant="block w-full ps-2 py-1 text-sm text-gray-900 border border-gray-300 rounded-full bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Search..."
        id={"search-bar-header"}
        onChange={handleSearch}
        types={"text"}
      />
      <Dropdown
        variant={"drop-down"}
        id={"chat-group"}
        childrencomp={
          <ListDropdown
            wrapVariant="relative flex flex-row justify-end items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse"
            wrapDropdownVariant="flex flex-col w-48 z-50 py-2 px-5 top-5 right-0 text-base absolute list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600"
            wrapDropdownChildVariant="py-3 sm:py-4 cursor-pointer flex flex-row items-center gap-2"
            wrapTextChildVariant="text-sm font-medium dark:gray-900 truncate"
            wrapTextChildColorVariant_1="text-gray-800"
            searchUser={listSearch}
          />
        }
        navHeaderClassName={"hidden"}
        isOpen={isSearchOpen}
      />
    </div>
  );
};

export default HeaderLeft;

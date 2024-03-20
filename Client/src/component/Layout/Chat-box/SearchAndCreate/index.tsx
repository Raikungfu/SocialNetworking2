import ShowList from "../../ShowList/ShowList";
import Form from "../../Form/FormInputWithAttachFile";
import ListDropdown from "../../List/ListDropdown/ListDropdown";
import { SearchAndCreateChatProps } from "./type";

const SearchAndCreateChat: React.FC<SearchAndCreateChatProps> = (props) => {
  return (
    <>
      <div
        id="chat-box"
        className="p-2 h-80 overflow-y-auto flex flex-col overflow-x-hidden"
      >
        <ShowList {...props.showList} />
        <ListDropdown {...props.searchList} />
      </div>
      <Form {...props.formInput} />
    </>
  );
};

export default SearchAndCreateChat;

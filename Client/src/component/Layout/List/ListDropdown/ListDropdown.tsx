import Img from "../../Img";
import logo from "../../../../assets/img/avtLogo.jpg";
import { ListProps } from "./type";
import { H3 } from "../../Text/H3";
import dayjs from "dayjs";

const ListDropdown: React.FC<ListProps> = (props) => {
  const list = props.listUserRecord;
  const listSearch = props.searchUser;
  return (
    (list || listSearch) && (
      <div className={props.wrapVariant}>
        <ul role="list" className={props.wrapDropdownVariant}>
          {list &&
            Object.keys(list).map((item) => (
              <li
                className={props.wrapDropdownChildVariant}
                key={"list-" + list[item].roomId}
                onClick={() => {
                  if (props.handleOpenReceptMessage)
                    props.handleOpenReceptMessage({
                      id: list[item].member?._id || list[item].roomId,
                      name: list[item].member?.name || list[item].name,
                      avt: list[item].member?.avt || list[item].avt,
                    });
                }}
              >
                <Img
                  alt="avt-user"
                  src={list[item].member?.avt || logo}
                  variant="avt"
                />
                <div className="flex flex-col gap-0.5 min-w-0">
                  <p
                    className={`${
                      list[item].online
                        ? props.wrapTextChildColorVariant_1
                        : props.wrapTextChildColorVariant_2
                    } ${props.wrapTextChildVariant}`}
                  >
                    {list[item].member?.name || list[item].name}
                  </p>
                  {list[item].lastMessage && (
                    <>
                      <span className="text-sm italic truncate block">
                        {list[item].sender + ": " + list[item].lastMessage}
                      </span>
                      <span className="text-xs italic">
                        {dayjs(list[item].timeStamp).format("DD/MM/YYYY")}
                      </span>
                    </>
                  )}
                </div>
              </li>
            ))}
          {listSearch &&
            listSearch.map((item) => (
              <>
                {Object.keys(item).map(
                  (member) =>
                    item[member].length > 0 && (
                      <>
                        <H3 content={member} />
                        {item[member].map((user) => (
                          <li
                            className={props.wrapDropdownChildVariant}
                            key={"listSearch-" + user._id}
                            onClick={() => {
                              if (props.handleOpenReceptMessage)
                                props.handleOpenReceptMessage({
                                  id: user._id,
                                  name: user.name,
                                  avt: user.avt,
                                });
                            }}
                          >
                            <Img
                              alt="avt-user"
                              src={user.avt || logo}
                              variant="avt"
                            />
                            <p
                              className={`${props.wrapTextChildColorVariant_1} ${props.wrapTextChildVariant}`}
                            >
                              {user.name}
                            </p>
                          </li>
                        ))}
                      </>
                    )
                )}
              </>
            ))}
        </ul>
      </div>
    )
  );
};

export default ListDropdown;

import Img from "../../Img";
import logo from "../../../../assets/img/logoAvt.jpeg";
import { ListProps } from "./type";
import { H3 } from "../../Text/H3";

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
                key={"list-" + props.title}
                onClick={() => {
                  if (props.handleOpenReceptMessage)
                    props.handleOpenReceptMessage({
                      id: list[item].member._id,
                      name: list[item].member.name,
                      avt: list[item].member.avt,
                    });
                }}
              >
                <Img
                  alt="avt-user"
                  src={list[item].member.avt || logo}
                  variant="avt"
                />
                <p
                  className={`${
                    list[item].online
                      ? props.wrapTextChildColorVariant_1
                      : props.wrapTextChildColorVariant_2
                  } ${props.wrapTextChildVariant}`}
                >
                  {list[item].member.name}
                </p>
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
                            key={"listSearch-" + item}
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

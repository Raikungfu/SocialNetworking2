import Img from "../../Img";
import logo from "../../../../assets/img/logoAvt.jpeg";
import { ListProps } from "./type";

const ListDropdown: React.FC<ListProps> = (props) => {
  const list = props.listUser;
  return (
    <div className={props.wrapVariant}>
      <ul role="list" className={props.wrapDropdownVariant}>
        {Object.keys(list).map((item) => (
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
      </ul>
    </div>
  );
};

export default ListDropdown;

import Img from "../../Img";
import logo from "../../../../assets/img/logoAvt.jpeg";
import { ListProps } from "./type";

const ListDropdown: React.FC<ListProps> = (props) => {
  const list = props.listUser;
  return (
    <div className={props.wrapVariant + " w-full"}>
      <div className="overflow-y-auto">
        <ul role="list" className={"w-full" + props.wrapDropdownVariant}>
          <>
            {Object.keys(list).map((item) => (
              <li
                className="py-3 sm:py-4 cursor-pointer"
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
                <div className="flex flex-row items-center gap-2">
                  <Img
                    alt="avt-user"
                    src={list[item].member.avt || logo}
                    variant="avt"
                  />
                  <p
                    className={`${
                      list[item].online ? "text-green-500" : "text-red-500"
                    } text-sm font-medium dark:gray-900`}
                  >
                    {list[item].member.name}
                  </p>
                </div>
              </li>
            ))}
          </>
        </ul>
      </div>
    </div>
  );
};

export default ListDropdown;

import { Link } from "react-router-dom";
import { NavProps } from "./types";

const Nav: React.FC<NavProps> = (props) => {
  return (
    <ul className={props.wrapNavVariant} key={props.id} id={props.id}>
      {props.navContext.navChild.map((items) => (
        <Link
          to={items.link}
          className="focus:text-red-500 focus:bg-[#827d7d21] hover:bg-[#827d7d21] focus:rounded-md"
        >
          <li
            key={items.id}
            className={`${props.wrapChildVariant} ${items.classColor} nav-child`}
          >
            {items.icon ?? items.icon}
            {items.context ? (
              <span className={props.navContext.className}>
                {items.context}
              </span>
            ) : (
              <></>
            )}
          </li>
        </Link>
      ))}
    </ul>
  );
};

export default Nav;

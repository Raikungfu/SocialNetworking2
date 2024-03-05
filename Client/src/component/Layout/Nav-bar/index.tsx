import { Link } from "react-router-dom";
import { NavProps } from "./types";
import { H3 } from "../Text/H3";

const Nav: React.FC<NavProps> = (props) => {
  return (
    <ul className={props.wrapNavVariant} key={props.id} id={props.id}>
      {props.label && <H3 content={props.label} />}
      {props.navContext.navChild.map((items) => (
        <Link
          id={items.id}
          key={items.id}
          to={items.link}
          className=" focus:text-red-500 focus:bg-[#827d7d21] hover:bg-[#827d7d21] focus:rounded-md"
        >
          <li
            className={`${props.wrapChildVariant} ${
              items.classColor || ""
            } nav-child`}
          >
            {items.label && (
              <label className={items.labelVariant}>{items.label}</label>
            )}
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

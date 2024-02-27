import { Link } from "react-router-dom";
import { NavProps } from "./types";

const Nav: React.FC<NavProps> = (props) => {
  return (
    <>
      <ul className={props.wrapNavVariant}>
        {props.navContext.map((items) => (
          <Link to={items.link}>
            <li key={items.id} className={props.wrapChildVariant}>
              {items.icon ?? items.icon}
              {items.context ?? (
                <span className="menu-title">{items.context}</span>
              )}
            </li>
          </Link>
        ))}
      </ul>
    </>
  );
};

export default Nav;

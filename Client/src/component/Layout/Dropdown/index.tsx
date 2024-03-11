import { DropdownProps } from "./types";
import Button from "../Button";
import { Link } from "react-router-dom";

const DropdownMenu: React.FC<DropdownProps> = (props) => {
  const handleOpenDropDownMenu = () => {
    props.handleOpenDropdown(props.id);
  };
  return (
    <div className={props.className} key={props.id} id={props.id}>
      <Button
        id={`user-menu-button-${props.id}`}
        className={`${props.navHeaderClassName}`}
        onClick={handleOpenDropDownMenu}
        childrencomp={props.navLinkAvt}
      />
      {props.isOpen &&
        (props.navLinkIcon ? (
          <div
            className={props.wrapDropdownListVariant}
            key={`user-dropdown-${props.id}`}
          >
            <div className="flex flex-col">
              {props.navLinkIcon?.map((navLink) => (
                <Link
                  id={""}
                  key={navLink.id}
                  to={navLink.link ? navLink.link : "#"}
                  className={"access-link"}
                  onClick={
                    navLink.link
                      ? () => {}
                      : (event) => {
                          event.preventDefault();
                          if (navLink.onClick) {
                            navLink.onClick();
                          }
                        }
                  }
                >
                  <div key={navLink.label} className="flex flex-row p-2 gap-2">
                    <span>{navLink.icon ? navLink.icon : ""}</span>
                    <span className={`${navLink.className}`}>
                      {navLink.label}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ) : (
          <>{props.childrencomp}</>
        ))}
    </div>
  );
};

export default DropdownMenu;

import { DropdownProps } from "./types";
import Button from "../Button";
import { Link } from "react-router-dom";

const DropdownMenu: React.FC<DropdownProps> = (props) => {
  const handleOpenDropDownMenu = () => {
    if (props.handleOpenDropdown) props.handleOpenDropdown(props.id);
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
            onClick={props.handleCloseDropdown}
          >
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
                <div
                  key={navLink.label}
                  className={props.wrapDropdownChildVariant}
                >
                  <span>{navLink.icon}</span>
                  <span className={`${navLink.className}`}>
                    {navLink.label}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <>{props.childrencomp}</>
        ))}
    </div>
  );
};

export default DropdownMenu;

import { useState } from "react";
import logoAvt from "../../../assets/img/logoAvt.jpeg";
import { DropdownProps } from "./types";
import Button from "../Button";
import Img from "../Img";
import LinkCmp from "../Link";

const DropdownMenu: React.FC<DropdownProps> = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
      <Button
        id={`user-menu-button-${props.id}`}
        className={`${props.navHeaderClassName}`}
        variant={undefined}
        onClick={toggleDropdown}
        children={
          <>
            <span className="sr-only">Open user menu</span>
            <Img src={logoAvt} alt="user photo" variant={"avt"} />
          </>
        }
        aria-expanded="false"
        data-dropdown-toggle="user-dropdown"
        data-dropdown-placement="bottom"
      />
      {isOpen && (
        <div
          className={props.wrapDropdownListVariant}
          key={`user-dropdown-${props.id}`}
        >
          <LinkCmp
            id={""}
            to={""}
            variant={"access-link"}
            className={props.navLinkAvt?.link}
          >
            <span>{props.navLinkAvt?.avtSrc}</span>
            {props.navLinkAvt?.info?.map((navLink) => (
              <span className={`${navLink.className}`}>{navLink.label}</span>
            ))}
          </LinkCmp>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;

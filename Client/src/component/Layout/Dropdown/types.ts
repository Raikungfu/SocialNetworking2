import { ReactNode } from "react";

export interface DropdownProps {
  variant: "drop-down";
  handleOpenDropdown?: (data: string) => void;
  isOpen?: boolean;
  className?: string;
  id: string;
  navHeaderClassName: string;
  childrencomp?: ReactNode;
  wrapDropdownListVariant?: string;
  wrapDropdownChildVariant?: string;
  navLinkIcon?: Array<{
    id?: string;
    className?: string;
    variant?:
      | "nav-link-icon-dropdown"
      | "nav-link-avt-dropdown"
      | "nav-link-dropdown";
    link?: string;
    label: string;
    icon?: ReactNode;
    onClick?: () => void;
  }>;
  navLinkAvt?: ReactNode;
}

import { ReactNode } from "react";

export interface DropdownProps {
  variant: "drop-down";
  className?: string;
  id: string;
  navHeaderClassName: string;
  children: Array<JSX.Element>;
  wrapDropdownListVariant?: string;
  wrapDropdownChildVariant?: string;
  navLinkIcon?: Array<{
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
  navLinkAvt?: {
    variant?: string;
    link: string;
    avtSrc?: JSX.Element;
    info?: Array<{
      className?: string;
      variant?:
        | "nav-link-icon-dropdown"
        | "nav-link-avt-dropdown"
        | "nav-link-dropdown";
      label: string;
    }>;
  };
}

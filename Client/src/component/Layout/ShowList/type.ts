import { clickUser } from "../List/ListDropdown/type";

export interface ShowListProps {
  wrapShowListVariant?: string;
  wrapChildVariant?: string;
  listUser?: clickUser[];
  listMedia?: FileList;
  button?: React.ReactNode | JSX.Element;
  buttonVariant?:
    | "accept-link-button"
    | "nav-button"
    | "reset-button"
    | "summit-button"
    | undefined;
  onClick?: (data: clickUser) => void;
}

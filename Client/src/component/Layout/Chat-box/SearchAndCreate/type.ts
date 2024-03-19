import { ChangeEvent } from "react";
import { clickUser } from "../../List/ListDropdown/type";

export interface SearchAndCreateChatProps {
  showList?: {
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
  };

  searchList?: {
    title?: string;
    wrapVariant?: string;
    wrapDropdownVariant?: string;
    wrapDropdownChildVariant?: string;
    wrapTextChildVariant?: string;
    wrapTextChildColorVariant_1?: string;
    wrapTextChildColorVariant_2?: string;
    handleOpenReceptMessage?: (data: clickUser) => void;
    searchUser?: Array<
      Record<
        string,
        {
          _id: string;
          name?: string;
          avt?: string;
        }[]
      >
    >;
  };

  formInput: {
    onSubmit?: (api: Element) => void;
    id: string;
    title?: string;
    wrapInputVariant?: string;
    wrapGroupInputVariant?: string;
    inputVariant?: string;
    titleVariant?: string;
    labelVariant?: string;
    input?: Array<{
      id: string;
      value?: string;
      types: string;
      children?: JSX.Element;
      inputVariant?: string;
      wrapInputVariant?: string;
      labelVariant?: string;
      required?: boolean;
      placeholder?: string;
      accept?: string;
      multiple?: boolean;
      groupInput?: {
        labelVariant?: string;
        inputVariant?: string;
        wrapInputVariant?: string;
        input: Array<{
          id: string;
          value: string;
          name: string;
          label: string;
        }>;
      };
    }>;
    formVariant?: string;
    onSubmitSuccess: (data: {
      "chat-attach-file-input"?: Array<{ url: string; type: string }>;
      content?: string;
    }) => void;
    onSubmitFail: (error: string) => void;
    onInputChange?: () => void;
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
    button?: string;
    buttonVariant?: string;
  };
}

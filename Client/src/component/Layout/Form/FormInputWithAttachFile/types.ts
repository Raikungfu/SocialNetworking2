import { ChangeEvent, RefObject } from "react";

export interface errorData {
  error?: string;
  status?: number;
}

export interface FormProps {
  onSubmit?: (api: Element) => void;
  id?: string;
  title?: string;
  wrapInputVariant?: string;
  wrapGroupInputVariant?: string;
  inputVariant?: string;
  titleVariant?: string;
  labelVariant?: string;
  input?: Array<{
    id: string;
    name?: string;
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
  buttonLabel?: string;
  formVariant?: string;
  onSubmitSuccess: (data: {
    "chat-attach-file-input"?: Array<{ url: string; type: string }>;
    content?: string;
  }) => void;
  onSubmitFail: (error: string) => void;
  onInputChange?: () => void;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onReset?: (form: RefObject<HTMLFormElement>) => void;
  button?: string;
  buttonVariant?: string;
}

export interface IndividualMessage {
  _id: string;
  roomId: string;
  sender: string;
  content: {
    "chat-attach-file-input"?: Array<{ url: string; type: string }>;
    content?: string;
  };
  createAt?: string;
}

export interface IndividualSendMessage {
  "chat-attach-file-input"?: Array<{ url: string; type: string }>;
  content?: string;
}

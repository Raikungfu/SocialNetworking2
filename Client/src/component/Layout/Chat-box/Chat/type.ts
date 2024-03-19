import { ChangeEvent } from "react";

export interface ChatProps {
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
    onSubmitFail: (error: string) => void;
    onInputChange?: () => void;
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
    button?: string;
    buttonVariant?: string;
  };
}

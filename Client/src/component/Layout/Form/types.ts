import { FormDataOrOther } from "../../../type/API";

export interface errorData {
  error?: string;
  status?: number;
}

export interface FormProps {
  formClassName?: string;
  onSubmit?: (api: Element) => void;
  wrapInputVariant?: string;
  inputVariant?: string;
  labelVariant?: string;
  formBeforeSubmit?: (formData: object) => void;
  input?: Array<{
    id: string;
    label?: string;
    value?: string;
    types: string;
    inputVariant?: string;
    wrapInputVariant?: string;
    labelVariant?: string;
    required?: boolean;
    placeholder?: string;
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
  groupBtn?: {
    id: string;
    buttons: Array<{
      id: string;
      label?: string;
      children?: React.ReactNode;
      className?: string;
      onClick?: () => void;
      onSubmit?: () => void;
      disabled?: boolean;
      variant?:
        | "accept-link-button"
        | "nav-button"
        | "reset-button"
        | "summit-button";
      type?: "button" | "submit" | "reset";
    }>;
    variant: string;
    label?: string;
    buttonClassName?: string;
  };
  formVariant?: string;
  onSubmitSuccess: (data: object) => void;
  onSubmitFail: (error: string) => void;
  apiFetchForm: <T>(data: FormDataOrOther<T>) => Promise<T>;
}

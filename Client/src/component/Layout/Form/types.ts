import { FormDataOrOther } from "../../../type/API";

export interface errorData {
  error?: string;
  status?: number;
}

export interface FormProps {
  onSubmit?: (api: Element) => void;
  wrapInputVariant?: string;
  inputVariant?: string;
  labelVariant?: string;
  input?: Array<{
    id: string;
    label: string;
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
  formVariant?: string;
  onSubmitSuccess: (data: object) => void;
  onSubmitFail: (error: string) => void;
  apiFetchForm: <T>(data: FormDataOrOther<T>) => Promise<T>;
}

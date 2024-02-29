import { FormDataOrOther } from "../../../type/API";

export interface errorData {
  error?: string;
  status?: number;
}

export interface NewPostFormProps {
  onSubmit?: (api: Element) => void;
  title?: string;
  wrapInputVariant?: string;
  wrapGroupInputVariant?: string;
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

  textarea: {
    id?: string;
    name?: string;
    label?: string;
    children?: JSX.Element;
    numberOfRows: number;
    variantTextarea:
      | "textarea-new-meeting"
      | "textarea-new-post"
      | "textarea-new-story";
    className?: string;
    variantLabel: string;
    placeholder: string;
    labelContent?: string;
    onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  };
  formVariant?: string;
  onSubmitSuccess: (data: object) => void;
  onSubmitFail: (error: string) => void;
  apiFetchForm: <T>(data: FormDataOrOther<T>) => Promise<T>;
}

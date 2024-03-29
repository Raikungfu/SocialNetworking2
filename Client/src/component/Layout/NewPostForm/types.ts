import { FormDataOrOther } from "../../../type/API";

export interface errorData {
  error?: string;
  status?: number;
}

export interface NewPostFormProps {
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
    label: string;
    value?: string;
    types: string;
    max?: number;
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

  textarea: {
    id?: string;
    name?: string;
    label?: string;
    variant?: string;
    children?: JSX.Element;
    rows: number;
    variantTextarea?:
      | "textarea-new-meeting"
      | "textarea-new-post"
      | "textarea-new-story";
    className?: string;
    labelVariant?: string;
    placeholder?: string;
    onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  };
  formVariant?: string;
  onSubmitSuccess: (data: object) => void;
  onSubmitFail: (error: string) => void;
  apiFetchForm: <T>(data: FormDataOrOther<T>) => Promise<T>;
  onInputFileChange?: (data: FileList) => void;
  button?: string;
  buttonVariant?: string;
}

export interface errorData {
  error?: string;
  status?: number;
}

export interface FormProps {
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
  onSubmitSuccess: (data: object) => void;
  onSubmitFail: (error: string) => void;
  button?: string;
  buttonVariant?: string;
}

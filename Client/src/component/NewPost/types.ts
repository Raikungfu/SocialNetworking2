export interface NewPostProps {
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
    labelVariant?: string;
    variantTextarea:
      | "textarea-new-meeting"
      | "textarea-new-post"
      | "textarea-new-story";
    className?: string;
    placeholder: string;
    onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  };
  formVariant?: string;
  button?: string;
  buttonVariant?: string;
}

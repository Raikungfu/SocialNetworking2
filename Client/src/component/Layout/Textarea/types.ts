export interface TextareaProps {
  id?: string;
  name?: string;
  label?: string;
  children?: JSX.Element;
  numberOfRows: number;
  className?: string;
  variantTextarea?:
    | "textarea-new-meeting"
    | "textarea-new-post"
    | "textarea-new-story";
  labelVariant?: string;
  placeholder?: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

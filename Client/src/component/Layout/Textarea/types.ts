export interface TextareaProps {
  id?: string;
  name?: string;
  label?: string;
  children?: JSX.Element;
  rows: number;
  className?: string;
  variant?:
    | "textarea-new-meeting"
    | "textarea-new-post"
    | "textarea-new-story"
    | string;
  labelVariant?: string;
  placeholder?: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

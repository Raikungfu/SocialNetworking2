export interface TextareaProps {
  label?: string;
  children?: JSX.Element;
  numberOfRows: number;
  variantTextarea:
    | "textarea-new-meeting"
    | "textarea-new-post"
    | "textarea-new-story";
  variantLabel: string;
  placeholder: string;
  onChange: (newValue: string) => void;
}

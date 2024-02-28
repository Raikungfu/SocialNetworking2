export interface TextareaProps {
  id?: string;
  name?: string;
  label?: string;
  children?: JSX.Element;
  numberOfRows: number;
  variantTextarea:
    | "textarea-new-meeting"
    | "textarea-new-post"
    | "textarea-new-story";
  variantLabel: string;
  placeholder: string;
  labelContent?: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

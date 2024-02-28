import { TextareaProps } from "./types";

const Textarea: React.FC<TextareaProps> = (props) => {
  const handleTextareaChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    props.onChange(event);
  };

  return (
    <>
      <label htmlFor={props.id} className={props.variantLabel}>
        {props.labelContent}
      </label>
      <textarea
        {...props}
        rows={props.numberOfRows}
        className={props.variantTextarea}
        onChange={handleTextareaChange}
      ></textarea>
    </>
  );
};

export default Textarea;

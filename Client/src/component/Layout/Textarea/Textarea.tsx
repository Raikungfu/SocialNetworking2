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
        id={props.id}
        rows={props.numberOfRows}
        className={props.variantTextarea}
        placeholder={props.placeholder}
        onChange={handleTextareaChange}
      ></textarea>
    </>
  );
};

export default Textarea;

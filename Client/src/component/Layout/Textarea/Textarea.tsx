import { TextareaProps } from "./types";

const Textarea: React.FC<TextareaProps> = (props) => {
  const handleTextareaChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const newValue = event.target.value;
    props.onChange(newValue);
  };

  return (
    <>
      <label htmlFor={props.id} className={props.labelClassName}>
        {props.labelContent}
      </label>
      <textarea
        id={props.id}
        rows={props.numberOfRows}
        className={props.textareaClassName}
        placeholder={props.placeholder}
        onChange={handleTextareaChange}
      ></textarea>
    </>
  );
};

export default Textarea;

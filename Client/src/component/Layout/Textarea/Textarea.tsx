import { TextareaProps } from "./types";

const Textarea: React.FC<TextareaProps> = (props) => {
  const handleTextareaChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    props.onChange(event);
  };

  return (
    <>
      {props.label ? (
        <label htmlFor={props.id} className={props.labelVariant}>
          {props.label}
        </label>
      ) : (
        <></>
      )}
      <textarea
        {...props}
        rows={props.numberOfRows}
        className={`${props.variantTextarea} ${props.className}`}
        onChange={handleTextareaChange}
      ></textarea>
    </>
  );
};

export default Textarea;

import { InputProps } from "./types";

const Input: React.FC<InputProps> = (props) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.onChange(event);
  };
  return (
    <div className={`${props.wrapInputVariant}`}>
      <label htmlFor={props.id} className={`${props.labelVariant}`}>
        {props.label}
      </label>
      <input
        type={props.types}
        className={`${props.inputVariant}`}
        name={props.id}
        id={props.id}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default Input;

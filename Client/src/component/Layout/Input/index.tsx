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
      {props.groupInput ? (
        <div className={props.wrapGroupInputVariant}>
          {props.groupInput.input.map((input) => (
            <div className={`${props.groupInput?.wrapInputVariant}`}>
              <input
                type={props.types}
                name={input.name}
                id={input.id}
                placeholder={props.placeholder}
                onChange={handleInputChange}
                required={props.required}
              />
              <label
                htmlFor={input.id}
                className={`${props.groupInput?.labelVariant}`}
              >
                {input.label}
              </label>
            </div>
          ))}
        </div>
      ) : (
        <input
          className={`${props.inputVariant}`}
          type={props.types}
          name={props.id}
          id={props.id}
          placeholder={props.placeholder}
          onChange={handleInputChange}
          required={props.required}
        />
      )}
    </div>
  );
};

export default Input;

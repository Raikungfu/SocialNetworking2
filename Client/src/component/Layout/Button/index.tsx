import { ButtonProps } from "./types";
import "./style.scss";

const Button: React.FC<ButtonProps> = (props) => {
  const handleSubmit = (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    props.onClick!();
  };

  return (
    <button
      {...props}
      onSubmit={handleSubmit}
      onClick={(event) => {
        event.stopPropagation();
        props.onClick!();
      }}
      className={`${props.variant} ${props.className}`}
    >
      {props.childrencomp && props.childrencomp}
      {props.label && props.label}
    </button>
  );
};

export default Button;

import { ButtonProps } from "./types";
import "./style.scss";

const Button: React.FC<ButtonProps> = (props) => {
  const handleClick = () => {
    if (props.onClick) {
      props.onClick();
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    handleClick();
  };

  return (
    <button
      {...props}
      onSubmit={handleSubmit}
      className={`${props.variant} ${props.className}`}
    >
      {props.childrencomp && props.childrencomp}
      {props.label && props.label}
    </button>
  );
};

export default Button;

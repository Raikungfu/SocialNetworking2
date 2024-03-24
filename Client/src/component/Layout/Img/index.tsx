import { ImgProps } from "./types";
import "./style.scss";

const Img: React.FC<ImgProps> = (props) => {
  const handleOnMouseEnter = () => {
    if (props.onMouseEnter) props.onMouseEnter(props.id || "");
  };
  const handleOnMousLeave = () => {
    if (props.onMouseLeave) props.onMouseLeave(props.id || "");
  };
  return (
    <img
      key={props.id}
      alt={props.alt}
      src={props.src}
      className={`${props.variant} ${props.className}`}
      onMouseLeave={handleOnMousLeave}
      onMouseEnter={handleOnMouseEnter}
      onClick={props.onClick}
    />
  );
};

export default Img;

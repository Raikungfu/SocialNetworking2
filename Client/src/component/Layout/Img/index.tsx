import { ImgProps } from "./types";
import "./style.scss";

const Img: React.FC<ImgProps> = (props) => {
  return (
    <img
      alt={props.alt}
      src={props.src}
      className={`${props.variant} ${props.className}`}
    />
  );
};

export default Img;

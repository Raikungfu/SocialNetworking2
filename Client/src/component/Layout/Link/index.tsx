import { LinkProps } from "./types";
import { Link } from "react-router-dom";
import "./style.scss";

const LinkCmp: React.FC<LinkProps> = (props) => {
  return (
    <Link {...props} className={`${props.variant} ${props.className ?? ""}`}>
      {props.label || props.children}
    </Link>
  );
};

export default LinkCmp;

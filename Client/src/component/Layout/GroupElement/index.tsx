import { GroupElementProps } from "./types";

const GroupElement: React.FC<GroupElementProps> = (props) => {
  return (
    <div className={`${props.variant}`}>
      {props.children.map((item) => item)}
    </div>
  );
};

export default GroupElement;

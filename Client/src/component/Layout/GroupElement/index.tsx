import { GroupElementProps } from "./types";

const GroupElement: React.FC<GroupElementProps> = (props) => {
  return (
    <div className={`${props.variant}`}>
      {props.childrencomp.map((item) => item)}
    </div>
  );
};

export default GroupElement;

import { GroupButtonProps } from "./types";

const GroupButton: React.FC<GroupButtonProps> = (props) => {
  return (
    <div className={`${props.variant}`}>
      {props.children.map((item) => item)}
    </div>
  );
};

export default GroupButton;

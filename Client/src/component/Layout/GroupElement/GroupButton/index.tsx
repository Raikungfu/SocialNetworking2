import Button from "../../Button";
import { GroupButtonProps } from "./types";

const GroupButton: React.FC<GroupButtonProps> = (props) => {
  return (
    <div className={`${props.variant}`}>
      {props.buttons.map((item) => (
        <Button
          {...item}
          className={`${props.buttonClassName} ${item.className}`}
        />
      ))}
    </div>
  );
};

export default GroupButton;

import Button from "../../Button";
import { GroupButtonProps } from "./types";

const GroupButton: React.FC<GroupButtonProps> = (props) => {
  return (
    <div className={`${props.variant}`} key={props.id}>
      {props.buttons.map((item) => (
        <Button
          key={item.id}
          {...item}
          className={`${props.buttonClassName} ${item.className}`}
        />
      ))}
    </div>
  );
};

export default GroupButton;

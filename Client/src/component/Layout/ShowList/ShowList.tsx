import Img from "../Img";
import { ShowListProps } from "./type";
import logo from "../../../assets/img/avtLogo.jpg";
import Button from "../Button";

const ShowList: React.FC<ShowListProps> = (props) => {
  return (
    <div className={props.wrapShowListVariant}>
      {props.listUser?.map((user) => (
        <div className={props.wrapChildVariant}>
          <Img variant="avt" src={user.avt || logo} />
          <p>{user.name}</p>
          {props.button && (
            <Button
              variant={props.buttonVariant}
              id={user.id + "-btn"}
              childrencomp={props.button}
              onClick={() => props.onClick && props.onClick(user)}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default ShowList;

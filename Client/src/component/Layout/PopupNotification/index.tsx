import Img from "../Img";
import CloseIcon from "@mui/icons-material/Close";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import { useState } from "react";

interface PopupProps {
  _id?: string;
  wrapPopupVariant?: string;
  role?: string;
  avt?: string;
  information?: string;
  message?: string;
  variantMessage?: string;
}
const Popup: React.FC<PopupProps> = (props) => {
  const [isShow, setIsShow] = useState<boolean>(true);
  setTimeout(() => {
    setIsShow(false);
  }, 10000);
  return (
    isShow && (
      <>
        <div className={props.wrapPopupVariant} role="alert">
          <>
            {typeof props.avt === "string" ? (
              <Img src={props.avt} variant="avt" className="self-center" />
            ) : (
              <NotificationsActiveIcon className="self-center" />
            )}
          </>
          <div className={props.variantMessage}>
            <p className="font-bold">{props.information}</p>
            <p
              className="text-sm"
              dangerouslySetInnerHTML={{ __html: props.message || "" }}
            />
          </div>

          <CloseIcon
            className="top-2 right-2 cursor-pointer sticky"
            onClick={() => setIsShow(false)}
          />
        </div>
      </>
    )
  );
};

export default Popup;

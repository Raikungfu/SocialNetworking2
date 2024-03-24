import Img from "../Img";
import CloseIcon from "@mui/icons-material/Close";
import InfoIcon from "@mui/icons-material/NotificationsActive";
import WarningIcon from "@mui/icons-material/Warning";
import ErrorIcon from "@mui/icons-material/Error";
import { useState } from "react";
import { H3 } from "../Text/H3";

interface PopupProps {
  _id?: string;
  wrapPopupVariant?: string;
  img?: string;
  header?: string;
  information?: string;
  message?: string;
  variantMessage?: string;
  type?: string;
}
const Popup: React.FC<PopupProps> = (props) => {
  const [isShow, setIsShow] = useState<boolean>(true);
  setTimeout(() => {
    setIsShow(false);
  }, 10000);
  let typeIcon;
  switch (props.type!) {
    case "error":
      return (typeIcon = <ErrorIcon className="self-center" />);
    case "warning":
      return (typeIcon = <WarningIcon className="self-center" />);
    case "active":
      return (typeIcon = <InfoIcon className="self-center" />);
  }

  return (
    isShow && (
      <>
        <div id={props._id} className={props.wrapPopupVariant} role="alert">
          <>
            {typeof props.img === "string" ? (
              <Img src={props.img} variant="avt" className="self-center" />
            ) : (
              typeIcon
            )}
          </>
          <div className={props.variantMessage}>
            <H3 variant="font-bold" content={props.header} />
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

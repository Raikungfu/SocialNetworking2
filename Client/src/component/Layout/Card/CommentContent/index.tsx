import Img from "../../Img";
import { CommentContentProps } from "./type";
import avt from "../../../../assets/img/avtLogo.jpg";
import MediaLayout from "../../MediaLayout";
import dayjs from "dayjs";

const CommentContent: React.FC<CommentContentProps> = (props) => {
  return (
    <>
      {props.listComment.length > 0 &&
        props.listComment.map((item, index) => {
          return (
            <div className="pb-5">
              <div key={index} className="flex flex-row gap-5 items-center">
                <Img src={item.author.avt || avt} variant="avt" />
                <h3>{item.author.name}</h3>
              </div>
              <div className="flex flex-col px-10 gap-1">
                <div className="w-full bg-white rounded-md px-4 py-2 text-sm font-medium text-gray-900 dark:text-gray-500">
                  {item.text}
                </div>
                <div className="w-1/2">
                  <MediaLayout childrencomp={item.media} />
                </div>
                <p className="text-xs">
                  {dayjs(item.createAt).format("YYYY-MM-DD HH:mm:ss") || ""}
                </p>
              </div>
            </div>
          );
        })}
    </>
  );
};

export default CommentContent;

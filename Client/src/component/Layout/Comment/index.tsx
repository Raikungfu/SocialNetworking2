import Form from "../Form/FormInputWithAttachFile";
import Img from "../Img";
import { CommentProps } from "./type";
import { Comment } from "../Card/CommentContent/type";
import logo from "../../../assets/img/avtLogo.jpg";
import { IndividualSendMessage } from "../Form/FormInputWithAttachFile/types";
import { API_USER_COMMENT_POST } from "../../../service/Post/fetchPost";

const CommentCmp: React.FC<CommentProps> = (props) => {
  const handleSuccess = async (response: IndividualSendMessage) => {
    const res = (await API_USER_COMMENT_POST({
      postId: props.postId,
      data: response,
    })) as unknown as Comment;
    props.onSendCommentSuccess(res);
  };

  const handleError = (error: string) => {
    alert(error);
  };

  return (
    <div className="flex flex-row items-center">
      <Img
        src={props.inputAvt ? props.inputAvt : logo}
        variant="avt"
        className="self-end my-6"
      />
      <Form
        {...props.formInput}
        input={[
          {
            ...props.formInput.input[0],
          },
          {
            ...props.formInput.input[1],
          },
        ]}
        onSubmitSuccess={handleSuccess}
        onSubmitFail={handleError}
        onInputChange={() => {}}
        id={"comment"}
      />
    </div>
  );
};

export default CommentCmp;

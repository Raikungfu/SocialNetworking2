import { API_USER_POST } from "../../../service/Post/fetchPost";
import NewPostForm from "../../Layout/NewPostForm";
import { NewPostProps } from "../types";

const NewPost: React.FC<NewPostProps> = (props) => {
  const handleSuccess = (data: object) => {
    console.log(data);
  };

  const handleError = (error: string) => {
    console.log(error);
  };

  const handleSubmitTextarea = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    console.log(event.target.name);
  };

  return (
    <NewPostForm
      {...props}
      textarea={{
        onChange: handleSubmitTextarea,
        ...props.textarea,
      }}
      onSubmitSuccess={handleSuccess}
      onSubmitFail={handleError}
      apiFetchForm={API_USER_POST}
    />
  );
};

export default NewPost;

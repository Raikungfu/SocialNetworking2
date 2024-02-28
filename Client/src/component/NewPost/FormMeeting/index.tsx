import { API_USER_POST } from "../../../service/Post/fetchPost";
import NewPostForm from "../../Layout/NewPostForm";

export const NewMeeting: React.FC = () => {
  const handleSuccess = (data: object) => {
    console.log(data);
  };

  const handleError = (error: string) => {
    console.log(error);
  };

  const handleSubmitTextarea = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    console.log(event);
  };

  return (
    <NewPostForm
      textarea={{
        id: "meeting-content",
        name: "meeting-content",
        label: "Post Content",
        numberOfRows: 4,
        className: "flex flex-row justify-between py-2",
        onChange: handleSubmitTextarea,
        variantLabel: "post-content",
        placeholder: "What in your mind",
        variantTextarea: "textarea-new-meeting",
      }}
      onSubmitSuccess={handleSuccess}
      onSubmitFail={handleError}
      apiFetchForm={API_USER_POST}
      inputVariant="flex flex-row justify-between py-2"
      input={[
        {
          id: "date-from",
          label: "From: ",
          types: "datetime-local",
        },
      ]}
    />
  );
};

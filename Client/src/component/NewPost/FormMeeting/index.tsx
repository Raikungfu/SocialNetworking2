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
      formVariant="flex flex-col flex-col-reverse"
      textarea={{
        id: "meeting-content",
        name: "meeting-content",
        label: "Post Content",
        numberOfRows: 2,
        className:
          "resize-none overflow-y-auto overscroll-none block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",
        onChange: handleSubmitTextarea,
        variantLabel: "meeting-content",
        placeholder: "Write your thoughts here...",
        variantTextarea: "textarea-new-meeting",
      }}
      onSubmitSuccess={handleSuccess}
      onSubmitFail={handleError}
      apiFetchForm={API_USER_POST}
      inputVariant="flex flex-row justify-between py-2"
      wrapInputVariant="flex flex-row justify-around py-2 gap-4 items-center"
      input={[
        {
          id: "date-from",
          label: "From: ",
          types: "date",
          inputVariant:
            "text-gray-900 bg-gray-50 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 rounded-lg px-2",
        },
        {
          id: "date-to",
          label: "To: ",
          types: "date",
          inputVariant:
            "text-gray-900 bg-gray-50 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 rounded-lg px-2",
        },
      ]}
    />
  );
};

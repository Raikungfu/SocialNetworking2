import { API_USER_POST } from "../../../service/Post/fetchPost";
import NewPostForm from "../../Layout/NewPostForm";

const FormPost: React.FC = () => {
  const handleSuccess = (data: object) => {
    // Xử lý thành công
    console.log(data);
  };

  const handleError = (error: string) => {
    // Xử lý lỗi
    console.log(error);
  };

  const handleSubmitTextarea = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    // Xử lý sự kiện thay đổi của textarea
    console.log(event); // In ra giá trị của textarea
  };

  return (
    <NewPostForm
      formVariant="space-y-4 md:space-y-6"
      inputVariant="bg-gray-50 my-2 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      wrapInputVariant="flex w-full rounded-md items-center"
      labelVariant="block basis-1/3 text-sm font-medium text-gray-900 dark:text-white"
      textarea={{
        id: "post-content",
        label: "Post Content",
        numberOfRows: 4,
        variantTextarea: "textarea-new-post",
        onChange: handleSubmitTextarea,
        variantLabel: "post-content",
        placeholder: "What in your mind",
      }}
      onSubmitSuccess={handleSuccess}
      onSubmitFail={handleError}
      apiFetchForm={API_USER_POST}
    />
  );
};

export default FormPost;

import { useState } from "react";
import { PostProps } from "./types";
import GroupButton from "../../Layout/GroupElement/GroupButton";
import NewPost from "../../NewPost/FormPost";
import { NewMeeting } from "../../NewPost/FormMeeting";

const Post: React.FC<PostProps> = () => {
  const [isNewPost, setIsNewPost] = useState(true);
  const [isNewMeeting, setIsNewMeeting] = useState(false);

  const handleClickNewPost = () => {
    setIsNewPost(true);
    setIsNewMeeting(false);
  };

  const handleClickNewMeeting = () => {
    setIsNewMeeting(true);
    setIsNewPost(false);
  };

  const handleClickNewStory = () => {
    setIsNewPost(false);
    setIsNewMeeting(false);
  };

  const InputComp = () => {
    if (isNewPost)
      return (
        <NewPost
          title="New Post"
          formVariant="space-y-4 md:space-y-6"
          inputVariant="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          wrapInputVariant="flex w-full rounded-md items-center"
          labelVariant="block basis-1/3 text-sm font-medium text-gray-900 dark:text-white"
          textarea={{
            id: "post-content",
            name: "post-content",
            numberOfRows: 4,
            variantTextarea: "textarea-new-post",
            className:
              "resize-none overflow-y-auto overscroll-none block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",
            placeholder: "What in your mind",
          }}
          input={[
            {
              id: "input-file",
              label: "Photo/Video",
              types: "file",
              accept: "image/*, video/*",
              multiple: true,
            },
          ]}
          buttonVariant="bg-opacity-30 text-xs md:text-base border-solid bg-[#827d7d21] hover:bg-slate-200 border-[#fcfcfca1] border-[1px] rounded-[5px] p-2 px-[20px] md:px-[70px] mt-2 self-end"
        />
      );
    else if (isNewMeeting)
      return (
        <NewMeeting
          title="New Meeting"
          formVariant="flex flex-col flex-col-reverse"
          textarea={{
            id: "meeting-content",
            name: "meeting-content",
            numberOfRows: 2,
            className:
              "resize-none overflow-y-auto overscroll-none block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",
            placeholder: "Write your thoughts here...",
            variantTextarea: "textarea-new-meeting",
          }}
          inputVariant="flex flex-row justify-between py-2"
          wrapInputVariant="flex flex-row justify-around gap-4 items-center"
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
          buttonVariant="bg-opacity-30 text-xs md:text-base border-solid bg-[#827d7d21] hover:bg-slate-200 border-[#fcfcfca1] border-[1px] rounded-[5px] p-2 px-[20px] md:px-[70px] mt-2 self-end"
        />
      );
    else return <></>;
  };

  return (
    <div className="w-8/12 flex flex-col justify-between text">
      <GroupButton
        buttonClassName="bg-opacity-30 text-xs md:text-base rounded-[5px] bg-[#827d7d21] hover:bg-slate-200 px-[5px] md:px-[15px] py-[5px]"
        buttons={[
          {
            id: "new-post",
            label: "New Post",
            type: "button",
            onClick: handleClickNewPost,
          },
          {
            id: "new-meeting",
            label: "New Meeting",
            type: "button",
            onClick: handleClickNewMeeting,
          },
          {
            id: "new-story",
            label: "New Post",
            type: "button",
            onClick: handleClickNewStory,
          },
        ]}
        variant={"flex flex-row gap-[18px] items-center justify-end pb-2"}
      />
      <InputComp />
    </div>
  );
};

export default Post;

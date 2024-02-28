import { useState } from "react";
import FormPost from "../../NewPost/FormPost";
import { PostProps } from "./types";
import GroupButton from "../../Layout/GroupElement";
import Button from "../../Layout/Button";

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
    if (isNewPost) return <FormPost />;
    else if (isNewMeeting) return <></>;
    else return <></>;
  };

  return (
    <div className="w-8/12 flex flex-col justify-between">
      <GroupButton
        children={[
          <Button
            id={"new-post"}
            label="New Post"
            type="button"
            onClick={handleClickNewPost}
            className="bg-opacity-30 text-xs md:text-base rounded-[5px] bg-[#827d7d21] hover:bg-slate-200 px-[5px] md:px-[15px] py-[5px]"
          />,
          <Button
            id={"new-meeting"}
            label="New Meeting"
            type="button"
            onClick={handleClickNewMeeting}
            className="bg-opacity-30 text-xs md:text-base rounded-[5px] bg-[#827d7d21] hover:bg-slate-200 px-[5px] md:px-[15px] py-[5px]"
          />,
          <Button
            id={"new-story"}
            label="New Post"
            type="button"
            onClick={handleClickNewStory}
            className="bg-opacity-30 text-xs md:text-base rounded-[5px] bg-[#827d7d21] hover:bg-slate-200 px-[5px] md:px-[15px] py-[5px]"
          />,
        ]}
        variant={"flex flex-row gap-[18px] items-center justify-end pb-2"}
      />
      <InputComp />
    </div>
  );
};

export default Post;

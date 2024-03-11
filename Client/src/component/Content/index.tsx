import { useState } from "react";
import CreatePost from "./CreatePost";
import LoadPost from "./Post";
import { PostProps } from "./Post/type";

const Content = () => {
  const [newPost, setNewPost] = useState<object>();

  return (
    <div className="w-full flex flex-col items-center justify-center md:w-8/12">
      <CreatePost
        onSubmitSuccess={(data) => {
          setNewPost(data);
        }}
        onSubmitFail={() => {}}
      />
      <LoadPost newPost={newPost as PostProps} />
    </div>
  );
};

export default Content;

import { useState } from "react";
import CreatePost from "./CreatePost";
import LoadPost from "./Post";
import { PostProps } from "./Post/type";

const Content = () => {
  const [newPost, setNewPost] = useState<object>();
  return (
    <div className="sm:w-9/12 w-11/12 flex flex-col items-center justify-center md:w-8/12">
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

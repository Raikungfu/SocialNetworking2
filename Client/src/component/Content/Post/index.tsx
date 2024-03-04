import React, { useEffect, useState } from "react";
import { PostProps, PostsProps } from "./type";
import Card from "../../Layout/Card";
import InfiniteScroll from "react-infinite-scroller";
import { API_USER_GET_POSTS } from "../../../service/Post/fetchPost";
import LoadingPost from "../../Layout/Skeleton/LoadingPost";

const LoadPosts: React.FC<PostsProps> = (props) => {
  const [posts, setPosts] = useState<PostProps[]>([]);
  const newPost = props.newPost;
  const loadMore = async (page: number) => {
    const response = await API_USER_GET_POSTS({ page });
    if (response) {
      const data = response as unknown as PostProps[];
      setPosts((prevPosts) => [...prevPosts, ...data]);
    }
  };

  useEffect(() => {
    if (newPost) setPosts((prevPosts) => [newPost, ...prevPosts]);
  }, [newPost]);

  return (
    <InfiniteScroll
      hasMore={true}
      initialLoad={true}
      isReverse={false}
      loadMore={loadMore}
      pageStart={0}
      threshold={250}
      useCapture={false}
      useWindow={true}
      loader={<LoadingPost />}
      className="w-full"
    >
      {posts?.map((post: PostProps, index: number) => {
        return (
          <Card id={`post-${index}`} key={`post-${index}-key`} {...post} />
        );
      })}
    </InfiniteScroll>
  );
};

export default LoadPosts;

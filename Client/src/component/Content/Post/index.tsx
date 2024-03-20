import React, { useEffect, useState } from "react";
import { PostProps, PostsProps } from "./type";
import Card from "../../Layout/Card";
import InfiniteScroll from "react-infinite-scroller";
import { API_USER_DASHBOARD_GET_POSTS } from "../../../service/Post/fetchPost";
import LoadingPost from "../../Layout/Skeleton/LoadingPost";

const LoadPosts: React.FC<PostsProps> = (props) => {
  const [posts, setPosts] = useState<PostProps[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [numberPosted, setNumberPosted] = useState<number>(0);
  const newPost = props.newPost;
  const loadMore = async (page: number) => {
    const response = await API_USER_DASHBOARD_GET_POSTS({ page, numberPosted });
    if (response) {
      const data = response as unknown as PostProps[];
      data.length > 0
        ? setPosts((prevPosts) => [...prevPosts, ...data])
        : setHasMore(false);
    }
  };

  useEffect(() => {
    if (newPost) {
      setPosts((prevPosts) => [newPost, ...prevPosts]);
      setNumberPosted(numberPosted + 1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newPost]);

  return (
    <InfiniteScroll
      hasMore={hasMore}
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
      {posts?.map((post: PostProps, index) => {
        return (
          <Card
            id={`post-${index}`}
            postId={post._id}
            {...post}
            key={`${post._id}-key`}
          />
        );
      })}
    </InfiniteScroll>
  );
};

export default LoadPosts;

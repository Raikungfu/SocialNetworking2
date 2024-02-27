import { CardProps } from "./types";
import "./style.scss";

const Button: React.FC<CardProps> = (props) => {
  return (
    <div className={`${props.className} ${props.type}-card`}>
      <h2>{props.title}</h2>
      <p>{props.content}</p>
      {props.onClick !== undefined ? (
        <button onClick={() => props.onClick!()}>Read More</button>
      ) : null}
    </div>
  );
};

export default Button;

import { useDispatch } from "react-redux";
import { createPostRequestAction } from "./Posts/actions"; // Import action creator

const MyComponent = () => {
  const dispatch = useDispatch();

  const handleCreatePost = () => {
    // Dispatch action
    dispatch(createPostRequestAction());
  };

  return <button onClick={handleCreatePost}>Tạo bài viết</button>;
};

export interface Post {
  id: number;
  title: string;
  content: string;
}

export interface FetchPostsRequestAction {
  type: "FETCH_POSTS_REQUEST";
}

export interface FetchPostsSuccessAction {
  type: "FETCH_POSTS_SUCCESS";
  payload: Post[];
}

export interface FetchPostsFailureAction {
  type: "FETCH_POSTS_FAILURE";
  payload: string;
}

export interface CreatePostRequestAction {
  type: "CREATE_POST_REQUEST";
}

export interface CreatePostSuccessAction {
  type: "CREATE_POST_SUCCESS";
  payload: Post;
}

export interface CreatePostFailureAction {
  type: "CREATE_POST_FAILURE";
  payload: string;
}

export type ActionTypes =
  | FetchPostsRequestAction
  | FetchPostsSuccessAction
  | FetchPostsFailureAction
  | CreatePostRequestAction
  | CreatePostSuccessAction
  | CreatePostFailureAction;

import { ActionTypes } from "./types";

export const fetchPostsRequest = (): ActionTypes => ({
  type: "FETCH_POSTS_REQUEST",
});

export const fetchPostsSuccess = (posts: Post[]): ActionTypes => ({
  type: "FETCH_POSTS_SUCCESS",
  payload: posts,
});

export const fetchPostsFailure = (error: string): ActionTypes => ({
  type: "FETCH_POSTS_FAILURE",
  payload: error,
});

// Other action creators...

export const createPostRequest = (): ActionTypes => ({
  type: "CREATE_POST_REQUEST",
});

export const createPostSuccess = (post: Post): ActionTypes => ({
  type: "CREATE_POST_SUCCESS",
  payload: post,
});

export const createPostFailure = (error: string): ActionTypes => ({
  type: "CREATE_POST_FAILURE",
  payload: error,
});

// Export all actions
export * from "./actions";

import React from "react";
import { User, Post } from "./types";

const ExampleComponent: React.FC = () => {
  // Sử dụng các interface ở đây
  const user: User = { id: 1, name: "John", email: "john@example.com" };
  const post: Post = {
    id: 1,
    title: "Hello World",
    content: "This is the content.",
  };

  return (
    <div>
      <h1>User Info</h1>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>

      <h1>Post Info</h1>
      <p>Title: {post.title}</p>
      <p>Content: {post.content}</p>
    </div>
  );
};

export default ExampleComponent;
export interface User {
  id: number;
  name: string;
  email: string;
}

export interface Post {
  id: number;
  title: string;
  content: string;
}

import { RefObject } from "react";

export interface PostProps {
  _id?: string;
  username?: string;
  content?: string;
  likes?: number;
  shares?: number;
  comment?: number;
  createAt?: Date;
  isEdited?: boolean;
  media?: Array<{ url: string; type: string }>;
  userLike?: Array<{
    username?: string;
    userId?: string;
    type?: string;
  }>;
  userId: {
    _id?: string;
    username?: string;
    avt?: string;
  };
}

export interface PostsProps {
  newPost: PostProps;
  ref?: RefObject<HTMLElement>;
}

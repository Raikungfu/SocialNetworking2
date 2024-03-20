export interface CardProps {
  id?: string;
  postId: string;
  type?: "post" | "meeting" | "story" | undefined;
  className?: string;
  variant?: string;
  title?: string;
  content?: string;
  onClick?: () => void;
  likes?: number;
  isLiked?: boolean;
  shares?: number;
  comments?: number;
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
    name?: string;
  };
}

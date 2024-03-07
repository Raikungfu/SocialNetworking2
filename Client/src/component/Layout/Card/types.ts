export interface CardProps {
  id?: string;
  type?: "post" | "meeting" | "story" | undefined;
  className?: string;
  variant?: string;
  title?: string;
  content?: string;
  onClick?: () => void;
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
    name?: string;
  };
}

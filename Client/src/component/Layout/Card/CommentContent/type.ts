export type Comment = {
  author: {
    _id: string;
    avt?: string;
    name?: string;
  };
  media: Array<{ url: string; type: string }>;
  text?: string;
  createAt?: string;
  isEdited?: string;
  _id?: string;
};

export interface CommentContentProps {
  listComment: Array<Comment>;
}

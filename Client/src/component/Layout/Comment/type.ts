import { Comment } from "../Card/CommentContent/type";

export interface CommentProps {
  postId: string;
  inputAvt?: string;
  wrapFormInput?: string;
  listComment: Array<Comment>;
  formInput: {
    onSubmit?: (api: Element) => void;
    id: string;
    title?: string;
    wrapInputVariant?: string;
    wrapGroupInputVariant?: string;
    inputVariant: string;
    titleVariant?: string;
    labelVariant?: string;
    input: Array<{
      id: string;
      value?: string;
      types: string;
      children?: JSX.Element;
      inputVariant?: string;
      wrapInputVariant?: string;
      labelVariant?: string;
      required?: boolean;
      placeholder?: string;
      accept?: string;
      multiple?: boolean;
      groupInput?: {
        labelVariant?: string;
        inputVariant?: string;
        wrapInputVariant?: string;
        input: Array<{
          id: string;
          value: string;
          name: string;
          label: string;
        }>;
      };
    }>;
    formVariant: string;
    buttonVariant: string;
  };

  onSendCommentSuccess: (data: Comment) => void;
}

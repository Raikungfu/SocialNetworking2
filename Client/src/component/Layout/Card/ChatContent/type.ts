export interface ContentProps {
  wrapContentCard?: string;
  wrapContent?: string;
  content: Array<{
    _id: string;
    sender_id: string;
    content: {
      "chat-attach-file-input"?: Array<{ url: string; type: string }>;
      content?: string;
    };
    createAt?: string;
    state?: string;
    file?: JSX.Element;
  }>;
  me?: string;
}

export type ChatContentProps = Array<{
  _id: string;
  sender_id: string;
  content: {
    "chat-attach-file-input"?: Array<{ url: string; type: string }>;
    content?: string;
  };
  sent_at?: string;
  state?: string;
  file?: JSX.Element;
}>;

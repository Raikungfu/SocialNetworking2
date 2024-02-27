export interface CardProps {
  type: "post" | "media" | "image" | undefined;
  className?: string;
  variant?: string;
  title: string;
  content: string;
  onClick: () => void;
}

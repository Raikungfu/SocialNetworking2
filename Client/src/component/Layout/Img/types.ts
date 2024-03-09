export interface ImgProps {
  id?: string;
  alt?: string;
  src?: string;
  variant?: "logo" | "avt" | "banner" | "post";
  className?: string;
  onMouseLeave?: (data: string) => void;
  onMouseEnter?: (data: string) => void;
}

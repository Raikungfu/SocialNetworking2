export interface PostProps {
  className?: string;
  variant?: string;
  onSubmitSuccess: (data: object) => void;
  onSubmitFail: (error: string) => void;
  groupButton?: {
    title?: string;
    wrapGroupButtonVariant?: string;
    wrapGroupButtonClassName?: string;
    wrapButtonClassName?: string;
    wrapButtonVariant?: string;
    buttons: Array<{
      id: string;
      label?: string;
      children?: React.ReactNode;
      className?: string;
      onClick?: () => void;
      onSubmit?: () => void;
      disabled?: boolean;
      variant?:
        | "accept-link-button"
        | "nav-button"
        | "reset-button"
        | "summit-button";
      type?: "button" | "submit" | "reset";
    }>;
  };
}

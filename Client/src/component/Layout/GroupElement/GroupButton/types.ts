export interface GroupButtonProps {
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
  variant: string;
  label?: string;
  buttonClassName?: string;
}

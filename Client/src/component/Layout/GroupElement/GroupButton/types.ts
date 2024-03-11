export interface GroupButtonProps {
  id?: string;
  buttons?: Array<{
    id: string;
    label?: string;
    childrencomp?: React.ReactNode;
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
  variant?: string;
  label?: string;
  buttonClassName?: string;
}

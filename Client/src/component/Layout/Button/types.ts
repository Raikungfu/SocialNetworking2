export interface ButtonProps {
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
    | "summit-button"
    | undefined;
  type?: "button" | "submit" | "reset";
}

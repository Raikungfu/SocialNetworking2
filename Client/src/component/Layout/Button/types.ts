export interface ButtonProps {
  id: string;
  label?: string;
  childrencomp?: React.ReactNode | JSX.Element;
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

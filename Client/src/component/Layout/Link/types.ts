export interface LinkProps {
  id: string;
  to: string;
  children?: React.ReactNode;
  label?: string;
  disabled?: boolean;
  variant: "access-link" | "nav-link";
  className?: string;
}

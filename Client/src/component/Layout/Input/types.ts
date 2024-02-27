export interface InputProps {
  id: string;
  label: string;
  value?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  types: string;
  wrapInputVariant?: string;
  inputVariant?: string;
  labelVariant?: string;
  require?: boolean;
}

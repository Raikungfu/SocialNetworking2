export interface InputProps {
  id: string;
  label?: string;
  value?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  types: string;
  wrapInputVariant?: string;
  wrapGroupInputVariant?: string;
  accept?: string;
  multiple?: boolean;
  pattern?: string;
  title?: string;
  groupInput?: {
    labelVariant?: string;
    inputVariant?: string;
    wrapInputVariant?: string;
    input: Array<{
      id: string;
      value: string;
      name: string;
      label: string;
    }>;
  };
  children?: JSX.Element;
  inputVariant?: string;
  labelVariant?: string;
  required?: boolean;
}

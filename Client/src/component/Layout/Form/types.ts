import { authResponseData } from "../../../type/API/User";

interface error {
  message: string;
  status: number;
}

export interface FormProps {
  onSubmit?: (api: Element) => void;
  input?: Array<{
    id: string;
    label: string;
    value?: string;
    types: string;
    wrapInputVariant?: string;
    inputVariant?: string;
    labelVariant?: string;
  }>;
  formVariant?: string;
  onSubmitSuccess: (data: authResponseData) => void;
  onSubmitFail: (error: error) => void;
}

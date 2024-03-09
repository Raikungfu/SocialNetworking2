export interface AxiosApiResponse<T> {
  data: T | null;
  error: string | null;
  status: number | null;
}

export type FormDataOrOther<T> = T;

export interface responseForm<T> {
  data: T | null;
  error: string | null;
  status: number | null;
}

export interface FormDataChat {
  "chat-attach-file-input":
    | FileList
    | Array<{ url: string; type: string }>
    | null;
  content?: string;
}

export interface FormDataPost {
  "input-file": FileList | Array<{ url: string; type: string }> | null;
  content?: string;
}

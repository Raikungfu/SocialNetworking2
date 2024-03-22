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

// export type FormDataChat =
//   | string
//   | FileList
//   | Array<{ url: string; type: string }>
//   | null;

export interface FormDataPost {
  "input-file": FileList | Array<{ url: string; type: string }> | null;
  content?: string;
}

export type FormDataChat =
  | string
  | FileList
  | { [key: string]: string | FileList | null }
  | { url: string; type: string }[];

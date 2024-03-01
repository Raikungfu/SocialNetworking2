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

export interface FormData {
  "input-file": FileList | null;
  [key: string]: string | string[] | FileList | number | undefined | null;
}

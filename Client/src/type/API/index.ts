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

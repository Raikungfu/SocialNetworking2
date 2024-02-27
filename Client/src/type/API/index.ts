export interface AxiosApiResponse<T> {
  data: T | null;
  error: string | null;
}

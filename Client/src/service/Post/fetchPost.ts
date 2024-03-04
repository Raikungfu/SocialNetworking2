import { AxiosError } from "axios";
import AxiosApi from "../../config/axios";
import { FormDataOrOther } from "../../type/API";
import { errorData } from "../../component/Layout/Form/types";

export const API_USER_POST = <T>(data: FormDataOrOther<T>): Promise<T> => {
  return AxiosApi.post<T>("/post/create", true, data)
    .then((response) => {
      if (response.data) {
        return response.data;
      } else {
        const error = response.error as AxiosError;
        const x = error.response?.data as errorData;
        throw new Error(x.error || "Input not correct!");
      }
    })
    .catch((error) => {
      throw error;
    });
};

export const API_USER_GET_POSTS = <T>(data: FormDataOrOther<T>): Promise<T> => {
  return AxiosApi.get<T>("/post/", true, data)
    .then((response) => {
      if (response.data) {
        return response.data;
      } else {
        const error = response.error as AxiosError;
        const x = error.response?.data as errorData;
        throw new Error(x.error || "Input not correct!");
      }
    })
    .catch((error) => {
      throw error;
    });
};

import { AxiosError } from "axios";
import AxiosApi from "../../config/axios";
import { FormDataOrOther } from "../../type/API";
import { errorData } from "../../component/Layout/Form/types";

export const API_LOG_USER = <T>(data: FormDataOrOther<T>): Promise<T> => {
  return AxiosApi.post<T>("/User/login", false, data)
    .then((response) => {
      if (response.data) {
        return response.data;
      } else {
        throw new Error("ID/Password not correct!");
      }
    })
    .catch((error) => {
      throw error;
    });
};

export const API_REG_USER = <T>(data: FormDataOrOther<T>): Promise<T> => {
  console.log(data);
  return AxiosApi.post<T>("/User/register", false, data)
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

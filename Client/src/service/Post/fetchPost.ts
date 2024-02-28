import AxiosApi from "../../config/axios";
import { FormDataOrOther } from "../../type/API";

export const API_USER_POST = <T>(data: FormDataOrOther<T>): Promise<T> => {
  return AxiosApi.post<T>("/post", true, data)
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

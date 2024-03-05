import { AxiosError } from "axios";
import { errorData } from "../../component/Layout/Form/types";
import AxiosApi from "../../config/axios";
import { FormDataOrOther } from "../../type/API";

export const API_USER_GET_ALL_USERS = <T>(
  data: FormDataOrOther<T>
): Promise<T> => {
  return AxiosApi.get<T>("/community/", true, data)
    .then((response) => {
      if (response.data) {
        return response.data;
      } else {
        const error = response.error as AxiosError;
        const x = error.response?.data as errorData;
        throw new Error(x.error || "Network has happen!");
      }
    })
    .catch((error) => {
      throw error;
    });
};

import { AxiosError } from "axios";
import { errorData } from "../../component/Layout/Form/types";
import AxiosApi from "../../config/axios";
import { FormDataOrOther } from "../../type/API";

export const API_USER_CREATE_MEETING_ROOM = <T>(
  data: FormDataOrOther<T>
): Promise<T> => {
  return AxiosApi.post<T>("/meeting/meeting-room/", true, data)
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

export const API_USER_GET_MEETING_ROOM = <T>(
  data: FormDataOrOther<T>
): Promise<T> => {
  return AxiosApi.get<T>("/meeting/meeting-room/", true, data)
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

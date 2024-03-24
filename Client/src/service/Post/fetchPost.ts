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

export const API_USER_DASHBOARD_GET_POSTS = <T>(
  data: FormDataOrOther<T>
): Promise<T> => {
  return AxiosApi.get<T>("/post/dashboard", true, data)
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

export const API_USER_PROFILE_GET_POSTS = <T>(
  data: FormDataOrOther<T>
): Promise<T> => {
  return AxiosApi.get<T>("/post/profile", true, data)
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

export const API_USER_COMMENT_POST = <T>(
  data: FormDataOrOther<T>
): Promise<T> => {
  return AxiosApi.post<T>("/post/comment", true, data)
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

export const API_USER_GET_COMMENT_POSTS = <T>(
  data: FormDataOrOther<T>
): Promise<T> => {
  return AxiosApi.get<T>("/post/comment", true, data)
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

export const API_USER_POST_LIKE = <T>(data: FormDataOrOther<T>): Promise<T> => {
  return AxiosApi.patch<T>("/post/like", true, data)
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

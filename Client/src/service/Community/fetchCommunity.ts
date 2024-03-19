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

export const API_GET_LIST_FRIENDS = <T>(
  data: FormDataOrOther<T>
): Promise<T> => {
  return AxiosApi.get<T>("/User/friends", true, data)
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

export const API_GET_REQUESTS = <T>(data: FormDataOrOther<T>): Promise<T> => {
  return AxiosApi.get<T>("/User/requests", true, data)
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

export const API_USER_ADD_FRIEND = <T>(_id: T): Promise<T> => {
  return AxiosApi.get<T>("/User/add-friend", true, _id)
    .then((response) => {
      if (response.data) {
        return response.data;
      } else {
        throw new Error("Fail to add friend");
      }
    })
    .catch((err) => {
      throw err;
    });
};

export const API_ACCEPT_REQUEST = <T>(_id: T): Promise<T> => {
  return AxiosApi.get<T>("/User/accept-request", true, _id)
    .then((response) => {
      if (response.data) {
        return response.data;
      } else {
        throw new Error("Fail to add friend");
      }
    })
    .catch((err) => {
      throw err;
    });
};

export const API_GET_USER_PROFILE = <T>(_id: T): Promise<T> => {
  return AxiosApi.get<T>("/community/profile", true, _id)
    .then((response) => {
      if (response.data) {
        return response.data;
      } else {
        throw new Error("Fail to get profile");
      }
    })
    .catch((err) => {
      throw err;
    });
};

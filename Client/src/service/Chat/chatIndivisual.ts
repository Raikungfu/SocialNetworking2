import { AxiosError } from "axios";
import { errorData } from "../../component/Layout/Form/types";
import AxiosApi from "../../config/axios";
import { FormDataOrOther } from "../../type/API";
import socket from "../../config/socketIO";

export const API_USER_GET_MESSAGE_INDIVIDUAL = <T>(
  data: FormDataOrOther<T>
): Promise<T> => {
  return AxiosApi.get<T>("/chat/chat-individual/", true, data)
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

export const GET_LIST_FRIEND_ONLINE_VIA_SOCKET = <T>(data: T): Promise<T> => {
  return new Promise((resolve, reject) => {
    socket.emit("friend:checkOnline", data, (dataRes: T) => {
      if (dataRes) resolve(dataRes);
    });

    socket.on("error", (error) => {
      reject(error);
    });
  });
};

export const API_USER_GET_MESSAGE_GROUP = <T>(
  data: FormDataOrOther<T>
): Promise<T> => {
  return AxiosApi.get<T>("/chat/chat-group/", true, data)
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

export const API_USER_GET_LIST_INDIVIDUAL = <T>(
  data: FormDataOrOther<T>
): Promise<T> => {
  return AxiosApi.get<T>("/chat/listChatIndividual/", true, data)
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

export const API_USER_GET_LIST_GROUP = <T>(
  data: FormDataOrOther<T>
): Promise<T> => {
  return AxiosApi.get<T>("/chat/listChatGroup/", true, data)
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

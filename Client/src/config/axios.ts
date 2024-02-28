import axios, { AxiosError } from "axios";
import Axios from "./interceptors";
import { API_BASE_URL } from "../type/constant";

interface AxiosApiResponse<T> {
  data: T | null;
  error: object | null;
}

const api = axios.create({
  baseURL: API_BASE_URL,
});

const AxiosApi = {
  get: async <T>(
    url: string,
    isAuthorized: boolean,
    params?: T
  ): Promise<AxiosApiResponse<T>> => {
    try {
      const response = isAuthorized
        ? await Axios.get<T>(url, { params })
        : await api.get<T>(url, { params });
      if (response.status === 200) {
        return { data: response.data, error: null };
      } else return { data: null, error: null };
    } catch (error) {
      return {
        data: null,
        error: error as AxiosError,
      };
    }
  },

  post: async <T>(
    url: string,
    isAuthorized: boolean,
    data: T
  ): Promise<AxiosApiResponse<T>> => {
    try {
      const response = isAuthorized
        ? await Axios.post<T>(url, data)
        : await api.post<T>(url, data);
      if (response.status === 200) {
        return { data: response.data, error: null };
      } else return { data: null, error: null };
    } catch (error) {
      return {
        data: null,
        error: error as AxiosError,
      };
    }
  },

  put: async <T>(
    url: string,
    isAuthorized: boolean,
    data: T
  ): Promise<AxiosApiResponse<T>> => {
    try {
      const response = isAuthorized
        ? await Axios.put<T>(url, data)
        : await api.put<T>(url, data);
      if (response.status === 200) {
        return { data: response.data, error: null };
      } else return { data: null, error: null };
    } catch (error) {
      return {
        data: null,
        error: error as AxiosError,
      };
    }
  },

  delete: async <T>(
    url: string,
    isAuthorized: boolean
  ): Promise<AxiosApiResponse<T>> => {
    try {
      const response = isAuthorized
        ? await Axios.delete<T>(url)
        : await api.delete<T>(url);
      if (response.status === 200) {
        return { data: response.data, error: null };
      } else return { data: null, error: null };
    } catch (error) {
      return {
        data: null,
        error: error as AxiosError,
      };
    }
  },
};

export default AxiosApi;

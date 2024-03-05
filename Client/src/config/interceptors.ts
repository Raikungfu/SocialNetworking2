import axios from "axios";
import Cookies from "js-cookie";
import { API_BASE_URL } from "../type/constant";

const Axios = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Accept: "application/json",
  },
  withCredentials: true,
});
Axios.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    Promise.reject(error.response || error.message);
  }
);

Axios.interceptors.response.use(
  (response) => {
    Cookies.set("accessToken", response.data?.accessToken);
    return Promise.resolve(response);
  },
  async (error) => {
    console.log(error);
    const refreshToken = Cookies.get("refreshToken");
    if (refreshToken && error.response?.status === 403) {
      Cookies.remove("accessToken");
      Cookies.remove("refreshToken");
      localStorage.clear();
      return Promise.reject("Token expired");
    }
    return Promise.reject(error.response || error.message);
  }
);

export default Axios;

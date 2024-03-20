import axios from "axios";
import { API_BASE_URL } from "../type/constant";
import Cookies from "js-cookie";

const Axios = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Accept: "application/json",
  },
});

Axios.interceptors.request.use(
  (config) => {
    const accessToken = Cookies.get("accessToken");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    Promise.reject(error.response || error.message);
  }
);

Axios.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const refreshToken = Cookies.get("refreshToken");
    if (refreshToken && error.response.status === 403) {
      try {
        const res = await axios.post(
          `${API_BASE_URL}/authentication/refreshToken`,
          {},
          {
            headers: {
              Authorization: `Bearer ${refreshToken}`,
            },
          }
        );
        if (res.status === 200) {
          Cookies.set("accessToken", res.data.accessToken, { expires: 1 });
          return axios.request(error.config);
        }
      } catch (error) {
        console.log("Error", error);
        Cookies.remove("accessToken");
        Cookies.remove("refreshToken");
        localStorage.clear();
      }
    } else {
      console.log(refreshToken && error.response.status === 403);
      console.log("Token expired");
      return Promise.reject(error.response || error.message);
    }
  }
);

export default Axios;

import AxiosApi from "../../config/axios";

type FormDataOrOther<T> = T;

export const API_LOG_USER = async <T>(data: FormDataOrOther<T>): Promise<T> => {
  try {
    const response = await AxiosApi.post<T>("/User/login", false, data);
    console.log(response);
    if (response.data !== null) {
      return response.data;
    } else {
      throw new Error("Response data is null");
    }
  } catch (error) {
    console.error("Fetch data failed:", error);
    throw error;
  }
};

export const API_REG_USER = async <T>(data: FormDataOrOther<T>): Promise<T> => {
  try {
    const response = await AxiosApi.post<T>("/User/register", false, data);
    console.log(response);
    if (response.data !== null) {
      return response.data;
    } else {
      throw new Error("Response data is null");
    }
  } catch (error) {
    console.error("Fetch data failed:", error);
    throw error;
  }
};

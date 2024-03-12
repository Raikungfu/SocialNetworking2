import AxiosApi from "../../config/axios";
import { FormDataOrOther } from "../../type/API";

export const API_SEARCH_USERS = <T>(data: FormDataOrOther<T>): Promise<T> => {
  return AxiosApi.get<T>("/search", true, data)
    .then((response) => {
      if (response.data) {
        return response.data;
      } else {
        throw new Error("Not found");
      }
    })
    .catch((err) => {
      console.log("sd" + err);
      throw err;
    });
};

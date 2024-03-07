import io from "socket.io-client";
import { API_BASE_URL } from "../type/constant";
import Cookies from "js-cookie";
import axios from "axios";

const socket = io(API_BASE_URL, {
  extraHeaders: {
    Authorization: `Bearer ${Cookies.get("accessToken")}`,
  },
});

socket.on("connect_error", (error) => {
  if (error && error.message.includes("Unauthorized")) {
    refreshTokenAndReconnect();
  }
});

async function refreshTokenAndReconnect() {
  try {
    const refreshToken = Cookies.get("refreshToken");
    const res = await axios.post(
      `${API_BASE_URL}/authentication/refreshToken`,
      {},
      {
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
        withCredentials: true,
      }
    );
    if (res.status === 200) {
      Cookies.set("accessToken", res.data.accessToken);
      socket.connect();
    }
  } catch (error) {
    console.log("Error refreshing token", error);
  }
}

export default socket;

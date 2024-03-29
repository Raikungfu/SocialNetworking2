import socket from "../../config/socketIO";

export const API_ = <T>(data: T): Promise<T> => {
  return new Promise((resolve, reject) => {
    socket.emit("meeting:PeerConnecting", data, (dataRes: T) => {
      if (dataRes) resolve(dataRes);
    });

    socket.on("error", (error) => {
      reject(error);
    });
  });
};

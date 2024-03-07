import socket from "../../config/socketIO";

export const API_SEND_MESSAGE = <T>(data: T): Promise<T> => {
  return new Promise((resolve, reject) => {
    console.log(data);
    socket.emit("message:individual", data);

    socket.on(`individual_message`, (response) => {
      console.log(response);
      if (response) {
        console.log(response);
        resolve(response);
      } else {
        reject(new Error("Network not working..."));
      }
    });

    socket.on("error", (error) => {
      reject(error);
    });
  });
};

export const API_CONNECT_ROOM_CHAT = <T>(data: T): Promise<T> => {
  return new Promise((resolve, reject) => {
    socket.emit("message:individual", data);

    socket.on(`individual_message`, (response) => {
      console.log(response);
      if (response) {
        resolve(response);
      } else {
        reject(new Error("Network not working..."));
      }
    });

    socket.on("error", (error) => {
      reject(error);
    });
  });
};

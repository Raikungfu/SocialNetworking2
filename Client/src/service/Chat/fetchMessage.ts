import socket from "../../config/socketIO";

// export const SOCKET_SEND_MESSAGE = (data: object) => {
//   socket.emit("message:individual", data);
//   socket.once(`individual_message`, (response) => {
//     if (response) {
//       console.log(response);
//       return response;
//     } else {
//       return new Error("Network not working...");
//     }
//   });

//   socket.on("error", (error) => {
//     return error;
//   });
// };

export const SOCKET_SEND_MESSAGE = (data: object) => {
  return new Promise((resolve, reject) => {
    socket.emit("message:individual", data);
    socket.once(`individual_message`, (response) => {
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

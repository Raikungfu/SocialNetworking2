const fs = require("fs");
const jwt = require("jsonwebtoken");

const checkAccess = async (socket, next) => {
  try {
    const token = socket.handshake.headers.authorization?.split(" ")[1];
    if (!token) {
      throw new Error("Token not provided");
    }
    const user = await checkJWT(token, "./Key/AccessToken/publickey.crt");
    socket.user = user;
    next();
  } catch (error) {
    next(new Error("Unauthorized"));
  }
};

function checkJWT(token, link) {
  return new Promise((resolve, reject) => {
    cert = fs.readFileSync(link);
    jwt.verify(token, cert, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}

module.exports = checkAccess;

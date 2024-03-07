const fs = require("fs");
const jwt = require("jsonwebtoken");

const AccountModel = require("../Modules/account");

const checkAccess = (socket) => {
  const token = socket.handshake.headers.authorization?.split(" ")[1];
  checkJWT(token, "./Key/AccessToken/publickey.crt")
    .then((data) => {
      if (data) {
        return data;
      }
    })
    .catch((error) => {
      return new Error(error);
    });
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

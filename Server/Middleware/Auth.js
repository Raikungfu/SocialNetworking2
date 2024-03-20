const fs = require("fs");
const jwt = require("jsonwebtoken");

const AccountModel = require("../Modules/account");

const checkAccess = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  checkJWT(token, "./Key/AccessToken/publickey.crt")
    .then((data) => {
      if (data) {
        req.user = data;
        next();
      }
    })
    .catch((error) => {
      return res.status(403).json(error);
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

function genNewAccessToken(data, req, res) {
  return new Promise((resolve, reject) => {
    AccountModel.findById(data.id)
      .then((existingUser) => {
        if (existingUser) {
          privateKey = fs.readFileSync("./Key/AccessToken/privateKey.pem");
          var accessToken = genAccessToken(
            existingUser,
            "user",
            privateKey,
            "1d",
            "RS256"
          );
          resolve({
            accessToken: accessToken,
            userName: existingUser.username,
            name: existingUser.name,
            id: existingUser._id,
          });
        } else {
          throw new Error("User not found!");
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
}

function genRefreshToken(user, role, privateKey, expiresIn, algorithm) {
  return jwt.sign({ id: user._id, role: user }, privateKey, {
    expiresIn: expiresIn,
    algorithm: algorithm,
  });
}

function genAccessToken(user, role, privateKey, expiresIn, algorithm) {
  return jwt.sign(
    {
      username: user.username,
      name: user.name,
      id: user._id,
      role: role,
    },
    privateKey,
    {
      expiresIn: expiresIn,
      algorithm: algorithm,
    }
  );
}

module.exports = checkAccess;
module.exports.genRefreshToken = genRefreshToken;
module.exports.genAccessToken = genAccessToken;
module.exports.checkJWT = checkJWT;
module.exports.genNewAccessToken = genNewAccessToken;

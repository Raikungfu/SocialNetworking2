const fs = require("fs");
const Cookies = require("cookies");
const jwt = require("jsonwebtoken");

const AccountModel = require("../Modules/account");

const checkAccess = (req, res, next) => {
  const cookies = new Cookies(req, res);
  var token = cookies.get("accessToken");
  checkJWTAccess(token)
    .then((data) => {
      if (data) {
        req.userData = data;
        next();
      }
    })
    .catch((error) => {
      console.log(error);
      const refreshToken = cookies.get("refreshToken");
      checkJWTRefresh(refreshToken)
        .then((data) => {
          if (data) {
            genNewAccessToken(data)
              .then((data) => {
                req.userData = data;
                next();
              })
              .catch((err) => {
                if (err instanceof Error) {
                  res.status(404).json({ error: err.message });
                } else {
                  res.status(500).json({ error: "An error occurred" });
                }
              });
          }
        })
        .catch((error) => {
          res.status(403).json(error.message);
        });
    });
};

function checkJWTAccess(token) {
  return new Promise((resolve, reject) => {
    cert = fs.readFileSync("./Key/AccessToken/publickey.crt");
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
          var accessToken = jwt.sign(
            {
              username: existingUser.username,
              name: existingUser.name,
              avt: existingUser.avt,
              id: existingUser._id,
              role: "user",
            },
            privateKey,
            {
              expiresIn: "60s",
              algorithm: "RS256",
            }
          );
          resolve({
            accessToken: accessToken,
            userName: existingUser.username,
            name: existingUser.name,
            avt: existingUser.avt,
            id: existingUser._id,
          });
        } else {
          throw new Error("User not found!");
        }
      })
      .catch((err) => {
        console.log("New access token found", err);
        reject(err);
      });
  });
}

function checkJWTRefresh(token) {
  return new Promise((resolve, reject) => {
    cert = fs.readFileSync("./Key/RefreshToken/publickey.crt");
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

const fs = require("fs");
const Cookies = require("cookies");
const jwt = require("jsonwebtoken");

const AccountModel = require("../Modules/account");

const checkAccess = (req, res, next) => {
  const cookies = new Cookies(req, res);
  var token = cookies.get("accessToken");
  checkJWT(token, "./Key/AccessToken/publickey.crt")
    .then((data) => {
      if (data) {
        req.userData = data;
        next();
      }
    })
    .catch((error) => {
      const refreshToken = cookies.get("refreshToken");
      checkJWT(refreshToken, "./Key/RefreshToken/publickey.crt")
        .then((data) => {
          if (data) {
            genNewAccessToken(data)
              .then((data) => {
                req.userData = data;
                next();
              })
              .catch((err) => {
                console.log(err);
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
            "60s",
            "RS256"
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
      avt: user.avt,
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

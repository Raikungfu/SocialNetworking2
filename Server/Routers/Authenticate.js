const express = require("express");
const app = express();

const { checkJWT, genNewAccessToken } = require("../Middleware/Auth");

app.post("/refreshToken", (req, res, next) => {
  const refreshToken = req.headers.authorization?.split(" ")[1];
  checkJWT(refreshToken, "./Key/RefreshToken/publickey.crt")
    .then((data) => {
      if (data) {
        genNewAccessToken(data)
          .then((data) => {
            res.status(200).json(data);
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

app.get("/", (req, res, next) => {
  if (req.user) {
    res.status(200).json(req.user);
  } else {
    res.status(404).json({ error: "User not found!" });
  }
});

module.exports = app;

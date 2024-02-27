const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");
var cookieParser = require("cookie-parser");
const fs = require("fs");
const Cookies = require("cookies");
const jwt = require("jsonwebtoken");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

const userState = require("./Routers/UserState");
const authentication = require("./Routers/Authenticate");
const userPosts = require("./Routers/Post");
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(`Access-Control-Allow-Methods`, `GET,PUT,POST,DELETE`);
  next();
});

const checkAccess = (req, res, next) => {
  const cookies = new Cookies(req, res);
  var token = cookies.get("accessToken");
  checkJWT(token)
    .then((data) => {
      if (data) {
        req.userData = data;
        next();
      }
    })
    .catch((error) => {
      res.status(403).json(error.message);
    });
};

function checkJWT(token) {
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

app.use("/User", userState);
app.use("/authentication", authentication);
app.use("/posts", checkAccess, userPosts);
app.use("/", checkAccess);

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res, next) => {
  res.status(200).json({ name: req.userData.name, avt: req.userData.avt });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});

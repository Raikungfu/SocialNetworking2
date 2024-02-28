const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");
var cookieParser = require("cookie-parser");
const checkAccess = require("./Middleware/Auth");

const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

const userState = require("./Routers/UserState");
const authentication = require("./Routers/Authenticate");
const userPosts = require("./Routers/Protected/Post");

app.use((req, res, next) => {
  if (process.env.NODE_ENV === "production") {
    res.header(
      "Access-Control-Allow-Origin",
      "https://socialnetworkingclient.onrender.com/"
    );
  } else {
    res.header("Access-Control-Allow-Origin", "http://localhost:5173");
  }
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(`Access-Control-Allow-Methods`, `GET,PUT,POST,DELETE`);
  next();
});

app.use("/User", userState);
app.use("/authentication", authentication);
app.use("/post", userPosts);
app.use("/", checkAccess);

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res, next) => {
  res.status(200).json({ name: req.userData.name, avt: req.userData.avt });
});

app.listen(port, () => {
  console.log("Server running on port 3000");
});

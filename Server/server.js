const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");
var cookieParser = require("cookie-parser");
const checkAccess = require("./Middleware/Auth");
const cors = require("cors");

const allowedOrigins = [
  "http://localhost:5173",
  "https://socialnetworkingclient.onrender.com",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

const userState = require("./Routers/UserState");
const authentication = require("./Routers/Authenticate");
const userPosts = require("./Routers/Post");
const community = require("./Routers/Community");

app.use("/User", userState);
app.use("/authentication", authentication);
app.use("/post", checkAccess, userPosts);
app.use("/community", community);
app.use("/", checkAccess, authentication);

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res, next) => {
  const user = req.userData;
  res.status(200).json(user);
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log("Server running on port 3000");
});

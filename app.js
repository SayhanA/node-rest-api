const path = require("path");
const multer = require("multer");
const express = require("express");
const bodyParser = require("body-parser");
const { default: mongoose } = require("mongoose");

const PORT = 8080;
const feedRoute = require("./routes/feed");
const authRoute = require("./routes/auth");

const app = express();

// File filter function
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

// Storage configuration
const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      new Date().toISOString().replace(/:/g, "-") + "-" + file.originalname
    );
  },
});

// Middlewars
app.use(express.json());
app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).single("image")
);

// app.use(bodyParser.urlencoded()); // x-www-form-urlencoded <form></form>
app.use(bodyParser.json()); // application/json
app.use("/images", express.static(path.join(__dirname, "images")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); // or a specific domain
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use("/auth", authRoute);
app.use("/feed", feedRoute);

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error?.data;
  res.status(status).json({ message: message, data: data });
});

mongoose
  .connect("mongodb://localhost:27017/messages")
  .then((res) => {
    app.listen(PORT, () => {
      console.log(`server is running on: http://localhost:${PORT}`);
    });
  })
  .catch((err) => console.log(err));

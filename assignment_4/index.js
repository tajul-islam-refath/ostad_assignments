const express = require("express");
const multer = require("multer");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const whitelist = ["image/png", "image/jpg"];
const upload = multer({
  storage: multer.diskStorage({
    destination: "./uploads/",
    filename: (req, file, cb) => {
      const name = file.originalname;
      cb(null, `${new Date().getTime()}-${name}`);
    },
  }),
  fileFilter: (req, file, cb) => {
    if (!whitelist.includes(file.mimetype)) {
      return cb(new Error("file is not allowed"));
    }

    cb(null, true);
  },
});

//get req with query params
app.get("/api/books", (req, res) => {
  let bookName = req.query.name;
  res.status(200).json({
    status: "success",
    name: bookName,
  });
});

//post req with body and headers
app.post("/api/books", (req, res) => {
  let token = req.headers["token"]; // it can be anything
  let { bookName, author, totalPage } = req.body;
  if (token) {
    res.status(200).json({
      status: "success",
      bookName,
      author,
      totalPage,
    });
  } else {
    res.status(401).json({
      status: "error",
      data: "Unothorized",
    });
  }
});

// uploads file api
app.post("/uploads", upload.single("image"), (req, res) => {
  try {
    res.send(req.file);
  } catch (err) {
    res.send(err.message);
  }
});

// downloads file with file name
app.get("/download/:filename", (req, res) => {
  res.download(`./uploads/${req.params.filename}`);
});

app.listen(5000, function (err) {
  if (err) {
    return console.error(err);
  }

  console.log("Server is running");
});

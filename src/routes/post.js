const express = require("express");
const router = express.Router();

const multer = require("multer");
const path = require("path");

const insertOP = require("../utils/insert");
const callFunc = require("../db/call_backs");
const table = require("../utils/table_list");

router.post("/data/:id", (req, res) => {
  const id = req.params.id;
  let stm = insertOP.insertAR(table[id], req.body);
  callFunc.addDataCallBack(stm, res);
});

//image uploader
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/uploads"); // Save files to "public/uploads"
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Rename file to avoid conflicts
  },
});

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
}).single("image");
// Check file type (only images)
function checkFileType(file, cb) {
  const filetypes = /jpeg|jpg|png|gif/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("Error: Images Only!");
  }
}

// API route to upload image
router.post("/upload/:id", (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      return res.status(400).send({ message: err });
    }

    if (!req.file) {
      return res.status(400).send({ message: "No file selected!" });
    }
    //registring in the data base products
    const id = req.params.id;
    let stm = `update products set image_url='/uploads/${req.file.filename}' where product_id=${id}`;
    callFunc.addDataCallBack(stm, res);

    // res.send({
    //   message: "File uploaded successfully!",
    //   filePath: `/uploads/${req.file.filename}`,
    // });
  });
});

module.exports = router;

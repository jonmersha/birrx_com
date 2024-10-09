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
  });
});

// Configure storage for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads"); // Set the destination to the public/uploads directory
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Use timestamp to prevent file name collisions
  },
});

// Initialize multer with the defined storage
const upload = multer({ storage });

router.post("/upl/:recId", upload.single("image"), (req, res) => {
  //const table = req.params.tableId;
  const recID = req.params.recId;

  //const id = req.params.id;
  let stm = `update products set image_url='/uploads/${req.file.filename}' where product_id=${recID}`;
  callFunc.addDataCallBack(stm, res);

  // let stm = updateOP.update(table, body);
  //callFunc.DBO(stm, res, "Error Uploading Images");
});

module.exports = router;

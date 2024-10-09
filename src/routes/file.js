const express = require("express");
const router = express.Router();

const multer = require("multer");
const path = require("path");

const insertOP = require("../utils/insert");
const callFunc = require("../db/call_backs");
const table = require("../utils/table_list");

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "public/uploads"); // Set the destination to the public/uploads directory
//   },
//   filename: (req, file, cb) => {
//     cb(null, `${Date.now()}-${file.originalname}`); // Use timestamp to prevent file name collisions
//   },
// });

// // Initialize multer with the defined storage
// const upload = multer({ storage });

// API route to upload image
// router.post("/apd/:id", (req, res) => {
//   upload(req, res, (err) => {

//     //registring in the data base products
//     const id = req.params.id;
//     let stm = `update products set image_url='/uploads/${req.file.filename}' where product_id=${id}`;
//     callFunc.addDataCallBack(stm, res);
//   });
// }
// );

// router.post("/up/:recId", upload.single("image"), (req, res) => {
//   const recID = req.params.recId;
//   let stm = `update products set image_url='/uploads/${req.file.filename}' where product_id=${recID}`;
//   callFunc.addDataCallBack(stm, res);
// });

// Set storage engine
const storage = multer.diskStorage({
  destination: "public/uploads",
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

// Initialize upload
const upload = multer({
  storage: storage,
  limits: { fileSize: 2400000 }, // Limit file size to 2MB
  // fileFilter: (req, file, cb) => {
  //   checkFileType(file, cb);
  // },
}).single("image"); // 'image' is the form field name

// Check file type
function checkFileType(file, cb) {
  const filetypes = /jpeg|jpg|png|gif/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);
  console.log(extname);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("Error: Images Only!");
  }
}

router.post("/:recId", (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      console.log(err);
      res.status(400).send({ msg: err });
    } else {
      if (req.file == undefined) {
        res.status(400).send({ msg: "No file selected!" });
      } else {
        console.log("iscomming");
        const recID = req.params.recId;
        let stm = `update products set image_url='/uploads/${req.file.filename}' where product_id=${recID}`;
        callFunc.addDataCallBack(stm, res);
      }
    }
  });
});

module.exports = router;

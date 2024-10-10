const express = require("express");
const app = express();
var cors = require("cors");
const fs = require("fs");

const multer = require("multer");
const path = require("path");

const port = 3000;
app.use(cors());
app.use(express.json());
app.use("/", express.static("public"));

// //Route inport
const getRoutes = require("./src/routes/get");
const postRoutes = require("./src/routes/post");
const updateRoutes = require("./src/routes/update");
const fileRoutes = require("./src/routes/file");
///Router
app.use("/get", getRoutes);
app.use("/post", postRoutes);
app.use("/put", updateRoutes);
app.use("/upload", fileRoutes);
//App Listerners
app.listen();
// app.listen(port, () => {
//   console.log(`Server Statrted @ ${port}`);
// });

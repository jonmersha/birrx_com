const express = require("express");
const app = express();
var cors = require("cors");

const port = 3000;
app.use(cors());
app.use(express.json());
app.use("/", express.static("public"));

//Route inport
const getRoutes = require("./src/routes/get");
const postRoutes = require("./src/routes/post");

app.use("/get", getRoutes);
app.use("/post", postRoutes);

//Remote Service Configurations
app.listen();

// app.listen(port, () => {
//   console.log(`Server Statrted @ ${port}`);
// });

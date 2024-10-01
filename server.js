const express = require("express");
const app = express();
var cors = require("cors");

const port = 3000;
app.use(cors());
app.use(express.json());
app.use("/", express.static("public"));
app.use("/static", express.static("public"));

//Route inport
const productRoutes = require("./src/routes/products");
// const promotionRoutes = require("./src/routes/promotions");
// const merchantRoutes = require("./src/routes/merchants");
const userRoutes = require("./src/routes/user");

// /Forex
// //============================================
// const ecom_get = require("./src/routes/get");
// app.use("/ecom", ecom_get);

// //=========================================
// const ecom_post = require("./src/post");
// app.use("/ecom", ecom_post);
// /
// //============================================
// const ecom_update = require("./src/update");
// app.use("/ecom", ecom_update);

// Routes
app.use("/users", userRoutes);
app.use("/products", productRoutes);
// app.use("/promotions", promotionRoutes);
// app.use("/merchants", merchantRoutes);

//Remote Service Configurations
//app.listen();
//Local service Configurations

// app.get("/protected", apiKeyMiddleware, (req, res) => {
//   res.json({ message: "You have access!" });
// });

app.listen(port, () => {
  console.log(`Server Statrted @ ${port}`);
});

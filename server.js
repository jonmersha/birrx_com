const express = require("express");
const app = express();
var cors = require("cors");

const port = 3000;
app.use(cors());
app.use(express.json());
app.use("/", express.static("public"));
app.use("/static", express.static("public"));

//Route inport
const userRoutes = require("./src/routes/user");

const productRoutes = require("./src/routes/products");
const categoryRoutes = require("./src/routes/category");
const promotionRoutes = require("./src/routes/promotions");
const promotion_productsRoutes = require("./src/routes/promotion_products");
const promotion_viewsRoutes = require("./src/routes/promotion_views");
const promotion_clicksRoutes = require("./src/routes/promotion_clicks");
const promotion_budgetsRoutes = require("./src/routes/promotion_budgets");
const promotion_imagesRoutes = require("./src/routes/promotion_images");
const merchantRoutes = require("./src/routes/merchants");
const merchant_subscriptionsRoutes = require("./src/routes/merchant_subscriptions");
const parent_categoriesRoutes = require("./src/routes/parent_categories");
const paymentsRoutes = require("./src/routes/payments");
const shopping_cartRoutes = require("./src/routes/shopping_cart");
const reviewsRoutes = require("./src/routes/reviews");
const audit_logsRoutes = require("./src/routes/audit_logs");
const product_viewsRoutes = require("./src/routes/product_views");
const product_likesRoutes = require("./src/routes/product_likes");
const subscription_plansRoutes = require("./src/routes/subscription_plans");

// Routes
app.use("/users", userRoutes);

app.use("/products", productRoutes);
app.use("/category", categoryRoutes);
app.use("/promotions", promotionRoutes);
app.use("/merchants", merchantRoutes);
app.use("/payments", paymentsRoutes);
app.use("/pcr", parent_categoriesRoutes);
app.use("/cast", shopping_cartRoutes);
app.use("/reviews", reviewsRoutes);
app.use("/audit", audit_logsRoutes);
app.use("/productv", product_viewsRoutes);
app.use("/productl", product_likesRoutes);
app.use("/sp", subscription_plansRoutes);
app.use("/ms", merchant_subscriptionsRoutes);
app.use("/pp", promotion_productsRoutes);
app.use("/pv", promotion_viewsRoutes);
app.use("/pc", promotion_clicksRoutes);
app.use("/pb", promotion_budgetsRoutes);
app.use("/pi", promotion_imagesRoutes);

//Remote Service Configurations
//app.listen();

app.listen(port, () => {
  console.log(`Server Statrted @ ${port}`);
});

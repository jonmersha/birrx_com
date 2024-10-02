const express = require("express");
const router = express.Router();

const Query = require("../../utils/select");
const apiKeyMiddleware = require("../../utils/api_check");
const callFunc = require("../../db/call_backs");

const db_name = "audit_logs";

//Returnining All User Data
router.get("/data", apiKeyMiddleware.apiKeyMiddleware, async (req, res) => {
  const stm = Query.all(db_name);
  callFunc.DBO(stm, res, "Error Getting Data!!");
});
//Returnining All User Data
router.get("/data/:ID", apiKeyMiddleware.apiKeyMiddleware, async (req, res) => {
  const user_id = req.params.ID;
  const stm = Query.byID(db_name, "user_id", user_id);
  callFunc.DBO(stm, res, "Error Getting Data!!");
});

module.exports = router;
// const productRoutes = require("./src/routes/toremove/products");
// const categoryRoutes = require("./src/routes/toremove/category");
// const promotionRoutes = require("./src/routes/toremove/promotions");
// const promotion_productsRoutes = require("./src/routes/toremove/promotion_products");
// const promotion_viewsRoutes = require("./src/routes/toremove/promotion_views");
// const promotion_clicksRoutes = require("./src/routes/toremove/promotion_clicks");
// const promotion_budgetsRoutes = require("./src/routes/toremove/promotion_budgets");
// const promotion_imagesRoutes = require("./src/routes/toremove/promotion_images");
// const merchantRoutes = require("./src/routes/toremove/merchants");
// const merchant_subscriptionsRoutes = require("./src/routes/toremove/merchant_subscriptions");
// const parent_categoriesRoutes = require("./src/routes/toremove/parent_categories");
// const paymentsRoutes = require("./src/routes/toremove/payments");
// const shopping_cartRoutes = require("./src/routes/toremove/shopping_cart");
// const reviewsRoutes = require("./src/routes/toremove/reviews");
// const audit_logsRoutes = require("./src/routes/toremove/audit_logs");
// const product_viewsRoutes = require("./src/routes/toremove/product_views");
// const product_likesRoutes = require("./src/routes/toremove/product_likes");
// const subscription_plansRoutes = require("./src/routes/toremove/subscription_plans");

// Routes
// app.use("/users", userRoutes);
// app.use("/products", productRoutes);
// app.use("/category", categoryRoutes);
// app.use("/promotions", promotionRoutes);
// app.use("/merchants", merchantRoutes);
// app.use("/payments", paymentsRoutes);
// app.use("/pcr", parent_categoriesRoutes);
// app.use("/cast", shopping_cartRoutes);
// app.use("/reviews", reviewsRoutes);
// app.use("/audit", audit_logsRoutes);
// app.use("/productv", product_viewsRoutes);
// app.use("/productl", product_likesRoutes);
// app.use("/sp", subscription_plansRoutes);
// app.use("/ms", merchant_subscriptionsRoutes);
// app.use("/pp", promotion_productsRoutes);
// app.use("/pv", promotion_viewsRoutes);
// app.use("/pc", promotion_clicksRoutes);
// app.use("/pb", promotion_budgetsRoutes);
// app.use("/pi", promotion_imagesRoutes);

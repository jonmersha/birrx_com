const express = require("express");
const router = express.Router();

//Crud Opearions
//const insertOP = require("../../utils/insert");
const Query = require("./utils/select");
const apiKeyMiddleware = require("./utils/api_check");
//const updateOP = require("../../utils/update");
//const deleteOP = require("../../utils/delete");

//Call Back Functions
const callFunc = require("./db/call_backs");
/**
 0"users",
  1"categories",
  2"products",
  3"orders",
  4"order_items",
  5"payments",
  6"shopping_cart",
  7"reviews",
  8"audit_logs",
  9"product_views",
  10"product_likes",
  11"merchants",
  12"subscription_plans",
  13"merchant_subscriptions",
  14"promotions",
  15"promotion_products",
  16"promotion_views",
  17"promotion_clicks",
  18"promotion_budgets",
  19"promotion_images",
 */
let table = [
  "users",
  "categories",
  "products",
  "orders",
  "order_items",
  "payments",
  "shopping_cart",
  "reviews",
  "audit_logs",
  "product_views",
  "product_likes",
  "merchants",
  "subscription_plans",
  "merchant_subscriptions",
  "promotions",
  "promotion_products",
  "promotion_views",
  "promotion_clicks",
  "promotion_budgets",
  "promotion_images",
];

//-----All Data Return
router.get(
  "/data/:tableId",
  apiKeyMiddleware.apiKeyMiddleware,
  async (req, res) => {
    const ID = req.params.tableId;
    const stm = Query.all(table[ID]);
    callFunc.DBO(stm, res, "Error Getting Data!!");
  }
);

//Today Rate Only
router.get("/rate/today", apiKeyMiddleware.apiKeyMiddleware, (req, res) => {
  const stm = `select * from todayRate`;
  callFunc.DBO(stm, res, "Error Getting Data!!");
});

//SELECT * FROM `allAVtrend` WHERE rate_date >= CURDATE() - INTERVAL 20 DAY;
//All Trensd By date interval
router.get(
  "/trend/:interval",
  apiKeyMiddleware.apiKeyMiddleware,
  async (req, res) => {
    const intervals = req.params.interval;
    const stm = `SELECT * FROM allAVtrend WHERE rate_date >= CURDATE() - INTERVAL ${intervals} DAY;`; //Query.selectAllCount(data[id]);
    callFunc.getData(stm, res);
  }
);
//Per bank Currency trend
router.get(
  "/bank/trend/:bankID/:interval",
  apiKeyMiddleware.apiKeyMiddleware,
  async (req, res) => {
    const bankId = req.params.bankID;
    const intervals = req.params.interval;

    const stm = `SELECT * FROM rate JOIN currency on currency.id=rate.currency_id where bank_id=${bankId} and rate_date >= CURDATE() - INTERVAL ${intervals} DAY; `; //Query.selectAllCount(data[id]);
    callFunc.getData(stm, res);
  }
);

router.get("/rate/max", apiKeyMiddleware.apiKeyMiddleware, (req, res) => {
  const stm = `select * from maxRate`;

  callFunc.DBO(stm, res, "Error Getting Data!!");
});

router.get(
  "/rate/cbuying/max",
  apiKeyMiddleware.apiKeyMiddleware,
  (req, res) => {
    const stm = `select * from cbuyingMax`;

    callFunc.DBO(stm, res, "Error Getting Data!!");
  }
);
router.get(
  "/rate/cselling/min",
  apiKeyMiddleware.apiKeyMiddleware,
  (req, res) => {
    const stm = `select * from csellingMin`;
    callFunc.DBO(stm, res, "Error Getting Data!!");
  }
);

router.get(
  "/rate/tselling/min",
  apiKeyMiddleware.apiKeyMiddleware,
  (req, res) => {
    const stm = `select * from tsellingMin`;

    callFunc.DBO(stm, res, "Error Getting Data!!");
  }
);

router.get(
  "/rate/tbuying/max",
  apiKeyMiddleware.apiKeyMiddleware,
  (req, res) => {
    const stm = `select * from tbuyingMax`;
    callFunc.DBO(stm, res, "Error Getting Data!!");
  }
);

router.get("/rates/latest", apiKeyMiddleware.apiKeyMiddleware, (req, res) => {
  const stm = `select * from latestRate`;
  callFunc.DBO(stm, res, "Error Getting Data!!");
});

router.get("/rates/topmax", apiKeyMiddleware.apiKeyMiddleware, (req, res) => {
  const stm = `select * from topMax`;
  callFunc.DBO(stm, res, "Error Getting Data!!");
});

router.get("/rate/new", apiKeyMiddleware.apiKeyMiddleware, (req, res) => {
  const stm = `select * from newRate`;
  callFunc.DBO(stm, res, "Error Getting Data!!");
});

router.get(
  "/rate/currency/trend",
  apiKeyMiddleware.apiKeyMiddleware,
  async (req, res) => {
    const stm = `select * from buyingAVtrend`;
    callFunc.DBO(stm, res, "Error Getting Data!!");
  }
);

router.get(
  "/data/:tableId/:id",
  apiKeyMiddleware.apiKeyMiddleware,
  async (req, res) => {
    const ID = req.params.tableId;
    const merchantID = req.params.id;
    const stm = Query.all_by_merchant(table[ID], merchantID);
    callFunc.DBO(stm, res, "Error Getting Data!!");
  }
);

//----Counting Records in the tables
router.get(
  "/count/:id",
  apiKeyMiddleware.apiKeyMiddleware,
  async (req, res) => {
    const id = req.params.id;
    const stm = Query.selectAllCount(data[id]);
    callFunc.getData(stm, res);
  }
);

//-----Serch in table with record ID
router.get(
  "/search/:tableId/:recId",
  apiKeyMiddleware.apiKeyMiddleware,
  async (req, res) => {
    const tableId = req.params.tableId;
    const recId = req.params.recId;
    const stm = Query.selectCTR(data[tableId], recId, "id");
    callFunc.getData(stm, res);
  }
);

//-----Get Users with Email ID
router.get(
  "/user/:uid",
  apiKeyMiddleware.apiKeyMiddleware,
  async (req, res) => {
    const uid = req.params.uid;
    const stm = Query.selectCTRString("users", uid, "uid");
    callFunc.getData(stm, res);
  }
);
//--- Merchant Product BY category
router.get(
  "/product/:val1/:val2",
  apiKeyMiddleware.apiKeyMiddleware,
  async (req, res) => {
    const id1 = req.params.val1;
    const id2 = req.params.val2;
    const stm = Query.select2key(
      "product",
      "category",
      id1,
      "merchant_id",
      id2
    );
    callFunc.getData(stm, res);
  }
);

//-----All Data Return
router.get(
  "/users/:email",
  apiKeyMiddleware.apiKeyMiddleware,
  async (req, res) => {
    const emailId = req.params.email;
    const stm = Query.selectCTR("systemu", `'${emailId}'`, "email");
    callFunc.DBO(stm, res, "Error Getting Data!!");
  }
);

module.exports = router;

const express = require("express");
const router = express.Router();
const table = require("../utils/table_list");
const Query = require("../utils/select");
const apiKeyMiddleware = require("../utils/api_check");
const callFunc = require("../db/call_backs");
/**
 *
 *
 *
 *
 *
 *
 *
 */
//return All data of the given table
console.log(table[0]);
router.get(
  "/data/:tableId",
  apiKeyMiddleware.apiKeyMiddleware,
  async (req, res) => {
    const ID = req.params.tableId;
    const stm = Query.all(table[ID]);
    callFunc.DBO(stm, res, "Error Getting Data!!");
  }
);
// get with criateria
router.put(
  "/data/:tableId/:connector",
  apiKeyMiddleware.apiKeyMiddleware,
  async (req, res) => {
    const ID = req.params.tableId;
    const connector = req.params.connector;
    const stm = Query.SELECT_WITH_CRIATERIA(table[ID], req.body, connector);
    callFunc.DBO(stm, res, "Error Getting Data!!");
  }
);

//last 3 or 4 days postted
router.get(
  "/interval/:tableId/:dateLength",
  apiKeyMiddleware.apiKeyMiddleware,
  async (req, res) => {
    const dateLength = req.params.dateLength;
    const tableId = req.params.tableId;
    const stm = `SELECT * FROM ${table[tableId]} WHERE created_at >= CURDATE() - INTERVAL ${dateLength} DAY;`; //Query.selectAllCount(data[id]);

    callFunc.getData(stm, res);
  }
);
module.exports = router;

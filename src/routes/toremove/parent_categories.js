const express = require("express");
const router = express.Router();

const Query = require("../../utils/select");
const apiKeyMiddleware = require("../../utils/api_check");
const callFunc = require("../../db/call_backs");

const db_name = "parent_categories";

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

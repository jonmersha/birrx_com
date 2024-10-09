const express = require("express");
const router = express.Router();

//Crud Opearions
const updateOP = require("../utils/update");

//Call Back Functions
const callFunc = require("../db/call_backs");
const table = require("../utils/table_list");

router.put("/update/:tableId", (req, res) => {
  const ID = req.params.tableId;
  let stm = updateOP.update(table[ID], req.body);
  console.log(stm);
  callFunc.DBO(stm, res, "Error Updating");
});

module.exports = router;

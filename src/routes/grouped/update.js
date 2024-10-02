const express = require("express");
const router = express.Router();

//Crud Opearions
const updateOP = require("./utils/update");

//Call Back Functions
const callFunc = require("./db/call_backs");

/**
 * 0:'bank',
 * 1:'customer',
 * 2:'currency',
 * 3:'bank_rate',
 * 4:'bank_posted'
 * 5'customer_posted',
 */
let table = [
  "bank",
  "customer",
  "currency",
  "bank_rate",
  "bank_posted",
  "customer_posted",
];

router.put("/update/:tableId", (req, res) => {
  const ID = req.params.tableId;
  let stm = updateOP.update(table[ID], req.body);
  console.log(stm);
  callFunc.DBO(stm, res, "Error Updating");
});

module.exports = router;

const express = require("express");
//const app = express();
const router = express.Router();

//Crud Opearions
const insertOP = require("./utils/insert");
const selectOP = require("./utils/select");
const updateOP = require("./utils/update");
const deleteOP = require("./utils/delete");

//Call Back Functions
const callFunc = require("./db/call_backs");
/**
 * 0:'bank',
 * 1:'customer',
 * 2:'currency',
 * 3:'rate',
 * 4:'bank_posted'
 * 5'customer_posted',
 */
let table = [
  "bank",
  "customer",
  "currency",
  "rate",
  "user_to_bank",
  "systemu",
  "bank_posted",
  "customer_posted",
  "systemu",
];

//----Add  Data To Database Table
router.post("/add/:id", (req, res) => {
  const id = req.params.id;
  let stm = insertOP.insert(table[id], req.body);
  callFunc.addDataCallBack(stm, res);
});

module.exports = router;

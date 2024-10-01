// routes/merchants.js
const express = require("express");
const router = express.Router();
const db = require("../db");

// Get all merchants
router.get("/", (req, res) => {
  const sql = "SELECT * FROM merchants";
  db.query(sql, (error, results) => {
    if (error) {
      return res.status(500).send(error);
    }
    res.json(results);
  });
});

// Create a new merchant
router.post("/", (req, res) => {
  const { user_id, business_name, contact_email, contact_phone } = req.body;
  const sql =
    "INSERT INTO merchants (user_id, business_name, contact_email, contact_phone) VALUES (?, ?, ?, ?)";
  db.query(
    sql,
    [user_id, business_name, contact_email, contact_phone],
    (error, results) => {
      if (error) {
        return res.status(500).send(error);
      }
      res.json({
        message: "Merchant added successfully",
        merchantId: results.insertId,
      });
    }
  );
});

module.exports = router;

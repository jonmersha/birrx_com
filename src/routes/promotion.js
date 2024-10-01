// routes/promotions.js
const express = require("express");
const router = express.Router();
const db = require("../db");

// Get all promotions
router.get("/", (req, res) => {
  const sql = "SELECT * FROM promotions";
  db.query(sql, (error, results) => {
    if (error) {
      return res.status(500).send(error);
    }
    res.json(results);
  });
});

// Get promotions for a specific product
router.get("/product/:id", (req, res) => {
  const { id } = req.params;
  const sql = `
    SELECT promotions.* FROM promotions
    JOIN promotion_products ON promotions.promotion_id = promotion_products.promotion_id
    WHERE promotion_products.product_id = ?`;
  db.query(sql, [id], (error, results) => {
    if (error) {
      return res.status(500).send(error);
    }
    res.json(results);
  });
});

// Create a promotion
router.post("/", (req, res) => {
  const {
    merchant_id,
    title,
    description,
    discount_percentage,
    start_date,
    end_date,
  } = req.body;
  const sql =
    "INSERT INTO promotions (merchant_id, title, description, discount_percentage, start_date, end_date) VALUES (?, ?, ?, ?, ?, ?)";
  db.query(
    sql,
    [
      merchant_id,
      title,
      description,
      discount_percentage,
      start_date,
      end_date,
    ],
    (error, results) => {
      if (error) {
        return res.status(500).send(error);
      }
      res.json({
        message: "Promotion created successfully",
        promotionId: results.insertId,
      });
    }
  );
});

module.exports = router;

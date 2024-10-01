const db = require("./db");

function getData(stm, res) {
  db.fetchDataFromMySQL(stm, (error, results) => {
    if (error) {
      res.status(500).json({ error: "Failed getting data" });
    } else {
      res.json({ Data: results });
    }
  });
}

function DBO(stm, res, message) {
  db.fetchDataFromMySQL(stm, (error, results) => {
    if (error) {
      res.status(500).json({ error: message });
    } else {
      res.json({ Data: results });
    }
  });
}

function addDataCallBack(stm, res) {
  db.fetchDataFromMySQL(stm, (error, results) => {
    if (error) {
      res.status(500).json({ error: "Error addings" });
    } else {
      res.json({ Data: results });
    }
  });
}

module.exports = { getData, addDataCallBack, DBO };

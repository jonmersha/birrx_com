require("dotenv").config();
const storeKey = process.env.API_KEY;
x = 0;

const apiKeyMiddleware = async (req, res, next) => {
  const apiKey = req.headers["x-api-key"]; // API key sent in headers
  console.log(x++);
  //console.log(req.headers);
  if (!apiKey) {
    return res.status(401).json({ message: "API KEY MISSING" });
  }
  if (apiKey == storeKey) {
    next();
  } else {
    return res.status(200).json({ message: "Invalid API Key " });
  }
};

module.exports = { apiKeyMiddleware };

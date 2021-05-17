const config = require("../../config");
const jwt = require("jsonwebtoken");

async function auth(req, res, next) {
  try {
    const token = req.headers.authorization;
    if (!token) {
      throw new Error();
    }
    const decoded = jwt.verify(token, config.secretKey);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({
      msg: "authorization denied",
    });
  }
}

module.exports = auth;
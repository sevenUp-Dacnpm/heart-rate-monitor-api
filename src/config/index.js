require("dotenv").config();

module.exports = {
  port: process.env.PORT || 8888,
  dbUri: process.env.DB_URI || "mongodb://localhost:27017/heart_rate_monitor",
  secretKey: process.env.SECRET_KEY || "heart-rate-monitor"
}
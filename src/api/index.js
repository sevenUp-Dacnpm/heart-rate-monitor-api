//const router = require("express").Router();
//const auth = require("./middlewares/auth");

// services
// const authServ = require("../services/auth");
// const userServ = require("../services/user");
// const recordServ = require("../services/record");

// router.get("/verify_token", auth, authServ.verify);
// router.post("/login", authServ.login);
// router.post("/register", authServ.register);

//router.get("/users", auth, userServ.getUsers);
// router.get("/user/:id", auth, userServ.getUserDetail);

// router.get("/heart_rates_record", auth, recordServ.getHeartRates);
// router.get("/heart_rate_record/:id", auth, recordServ.getHeartRateDetail);
// router.post("/heart_rate_record", auth, recordServ.createHeartRate);


module.exports = function(app) {
    app.use('/users',require('./routes/user.route'));
};
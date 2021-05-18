// router.get("/heart_rates_record", auth, recordServ.getHeartRates);
// router.get("/heart_rate_record/:id", auth, recordServ.getHeartRateDetail);
// router.post("/heart_rate_record", auth, recordServ.createHeartRate);


module.exports = function(app) {
    app.use('/users',require('./routes/user.route'));
};
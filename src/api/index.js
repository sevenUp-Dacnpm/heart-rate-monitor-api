module.exports = function (app) {
  app.use('/', require('./routes/auth.route'));
  app.use('/users', require('./routes/user.route'));
  app.use('/heart_rate_records', require('./routes/record.route'));
};
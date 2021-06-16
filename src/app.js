const express = require('express');
require('express-async-errors');
const cors = require('cors');
const morgan = require('morgan');
const config = require('./config');
const { connectDB } = require('./loaders/mongoose');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

const startServ = async () => {
  // require('./api')(app); // load api
  await connectDB(config.dbUri);
};
startServ();

require('./api/index')(app);

app.use((req, res, next) => {
  res.status(404).json({
    error_message: 'Endpoint not found',
  });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error_message: 'Something broke!',
  });
});

app.listen(config.port, () => {
  console.log(`server listening on port ${config.port}`);
});

module.exports = app;

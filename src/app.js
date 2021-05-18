const express = require("express");
const config = require("./config");
//const api = require("./api");

// loaders
const {connectDB} = require("./loaders/mongoose");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require('./api/index')(app);

const startServ = async () => {
  require('./api')(app); // load api
  await connectDB(config.dbUri);
}

app.listen(config.port, () => {
  console.log(`server listening on port ${config.port}`);
})

startServ();
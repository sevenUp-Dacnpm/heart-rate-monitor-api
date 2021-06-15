const config = require('./config');
const app = require('./app');
const { connectDB } = require('./loaders/mongoose');

const startServ = async () => {
  require('./api')(app); // load api
  await connectDB(config.dbUri);
};

app.listen(config.port, () => {
  console.log(`server listening on port ${config.port}`);
});

startServ();

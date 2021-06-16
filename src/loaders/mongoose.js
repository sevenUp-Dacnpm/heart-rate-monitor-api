const mongoose = require('mongoose');
const Mockgoose = require('mockgoose').Mockgoose;

async function connectDB(url) {
  try {
    await mongoose.connect(url, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
    // console.log('connected database');
    } catch (err) {
      console.error(err.message);
      throw new Error();
    }
  // if (process.env.NODE_ENV === 'test') {
  //   const mockgoose = new Mockgoose(mongoose);

  //   mockgoose.prepareStorage().then(async () => {
  //     try {
  //       await mongoose.connect(url, {
  //         useCreateIndex: true,
  //         useNewUrlParser: true,
  //         useUnifiedTopology: true,
  //         useFindAndModify: false,
  //       });
  //       // console.log('connected database');
  //     } catch (err) {
  //       // console.error(err.message);
  //       throw new Error();
  //     }
  //   });
  // } else {
  //   try {
  //   await mongoose.connect(url, {
  //     useCreateIndex: true,
  //     useNewUrlParser: true,
  //     useUnifiedTopology: true,
  //     useFindAndModify: false,
  //   });
  //   // console.log('connected database');
  //   } catch (err) {
  //     console.error(err.message);
  //     throw new Error();
  //   }
  // }
}

const closeDB = () => mongoose.disconnect();

module.exports = { connectDB, closeDB };

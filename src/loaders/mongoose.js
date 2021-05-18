// "use strict";
// Object.defineProperty(exports, "__esModule", { value: true });

const mongoose = require("mongoose");

const connectDB = async (url) => {

  if(process.env.NODE_ENV ==='test') {
    const Mockgoose = require('mockgoose').Mockgoose;
    const mockgoose = new Mockgoose(mongoose);

    mockgoose.prepareStorage()
      .then(async () => {
        try {
          await mongoose.connect(url, {
            useCreateIndex: true,
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
          });
          console.log("connected database");
        } catch (err) {
          console.error(err.message);
        }
      })
  } else {
    try {
      await mongoose.connect(url, {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
      });
      console.log("connected database");
    } catch (err) {
      console.error(err.message);
    }
  }
}
// // exports.connectDB = connectDB;

const closeDB = async () => {
  return await mongoose.disconnect();
}
// exports.closeDB = closeDB;

module.exports = connectDB;

// module.exports = {
//   async connectDB(url) {
//     try {
//       await mongoose.connect(url, {
//         useCreateIndex: true,
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//         useFindAndModify: false,
//       });
//       console.log("connected database");
//     } catch (err) {
//       console.error(err.message);
//     }
//   },
//   async closeDB() {
//     return await mongoose.disconnect();
//   }
// };
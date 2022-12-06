const mongoose = require("mongoose");

const connectDatabase = async () => {
  try {
    const connect = await mongoose.connect(
      process.env.MONGO_URI,
      {
        useNewUrlParser: true,
      }
    );
    console.log("Database has connected successfully");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
  
module.exports = connectDatabase;





// const mongoose = require("mongoose");

// const connectDatabase = async () => {
//   try {
//     const connect = await mongoose.connect(
//       "mongodb://127.0.0.1:27017/VOTING-DAPP",
//       {
//         useNewUrlParser: true,
//       }
//     );
//     console.log("Database connected");
//   } catch (error) {
//     console.log(error);
//     process.exit(1);
//   }
// };

// module.exports = connectDatabase;
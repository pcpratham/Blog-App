const mongoose = require("mongoose");

require("dotenv").config();
const dbConnect = () => {
  mongoose
    .connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Db connection established");
    })
    .catch((err) => {
      console.log("Db connection failed");
    });
};

module.exports = dbConnect;

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const connectDB = async () => {
  const conn = await mongoose.connect(process.env.DATABASE_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log(
    `MongoDB connected to : ${conn.connection.host}`.cyan.underline.bold
  );
};

module.exports = connectDB;

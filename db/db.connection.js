const mongoose = require('mongoose');

const dbConnect = async (connectionString) => {
  try {
    const option = {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true
    };
    const dbConn = await mongoose.connect(connectionString, option);
    console.log(`DB has been connected: ${dbConn.connection.host}`);
  } catch (err) {
    console.log(`DB connection error: ${err.message}`);
    process.exit(1);
  }
};

module.exports = dbConnect;

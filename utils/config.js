const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

module.exports.PORT = process.env.PORT || 3000;
module.exports.CONNECTION_STRING = process.env.CONNECTION_STRING;

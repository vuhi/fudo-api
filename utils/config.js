const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

module.exports.PORT = process.env.PORT || 3000;
module.exports.CONNECTION_STRING = process.env.CONNECTION_STRING;
module.exports.STATUSES = process.env.STATUSES.split(',');
module.exports.ROLES = process.env.ROLES.split(',');

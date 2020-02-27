const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

module.exports.PORT = process.env.PORT || 3000;
module.exports.CONNECTION_STRING = process.env.CONNECTION_STRING;

module.exports.PRIVATE_KEY = process.env.PRIVATE_KEY;
module.exports.PUBLIC_KEY = process.env.PUBLIC_KEY;
module.exports.TOKEN_AGO = process.env.TOKEN_AGO;
module.exports.TOKEN_EXPIRE = process.env.TOKEN_EXPIRE;
module.exports.AUDIENCE = process.env.AUDIENCE;
module.exports.ISSUER = process.env.ISSUER;

const ACTIVE = 'ACTIVE';
const BLOCKED = 'BLOCKED';
module.exports.ACTIVE = ACTIVE;
module.exports.BLOCKED = BLOCKED;
module.exports.STATUSES = [ACTIVE, BLOCKED];

const USER = 'USER';
const ADMIN = 'ADMIN';
const SUPER_ADMIN = 'SUPER_ADMIN';
module.exports.USER = USER;
module.exports.ADMIN = ADMIN;
module.exports.SUPER_ADMIN = SUPER_ADMIN;
module.exports.ROLES = [USER, ADMIN, SUPER_ADMIN];

const EASY = 'EASY';
const MEDIUM = 'MEDIUM';
const HARD = 'HARD';
const CHEF = 'CHEF';
module.exports.EASY = EASY;
module.exports.MEDIUM = MEDIUM;
module.exports.HARD = HARD;
module.exports.CHEF = CHEF;
module.exports.LEVELS = [EASY, MEDIUM, HARD, CHEF];

module.exports.DEFAULT_RECIPE_PAGE = 1;
module.exports.DEFAULT_RECIPE_LIMIT = 10;

const userService = require('../../services/user.service');
const { verify } = require('../token.handler');
const { ErrorResponse } = require('../../utils/error-response.class');

const auth = async (req, res, next) => {
  try {
    const header = req.header('Authorization');
    if (!header) { throw new Error('missing header'); }

    const content = header.split(' ');
    if (content.length !== 2 || !content[0].toLowerCase().startsWith('bearer')) {
      throw new Error('malformed token');
    }

    const decoded = verify(content[1]);
    if (!decoded) { throw new Error('fail to validate token'); }

    req.user = await userService.getUser(decoded.id);
    next();
  } catch (err) {
    next(new ErrorResponse(err.message, 401));
  }
};

module.exports = { auth };

const jwt = require('jsonwebtoken');
const { PRIVATE_KEY, PUBLIC_KEY, TOKEN_AGO, TOKEN_EXPIRE, ISSUER, AUDIENCE } = require('./config');

const sign = (payload, email) => {
  if (!payload || !email) {
    return new Error('cannot sign token: invalid arguments');
  }
  const signOptions = {
    issuer: ISSUER,
    subject: email,
    audience: AUDIENCE,
    expiresIn: TOKEN_EXPIRE,
    algorithm: TOKEN_AGO
  };
  return jwt.sign(payload, PRIVATE_KEY, signOptions);
};

const verify = (token) => {
  const verifyOptions = {
    issuer: ISSUER,
    // subject: email,
    audience: AUDIENCE,
    expiresIn: TOKEN_EXPIRE,
    algorithm: TOKEN_AGO
  };
  try {
    return jwt.verify(token, PUBLIC_KEY, verifyOptions);
  } catch (err) {
    return new Error(`fail to verify token: ${err.message}`);
  }
};

module.exports = { sign, verify };

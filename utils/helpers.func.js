module.exports.isObjectNullOrEmpty = (obj) => {
  if (obj === null || obj === undefined || Object.getOwnPropertyNames(obj).length === 0) {
    return true;
  }
  return false;
};

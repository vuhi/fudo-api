const OBJECT_ID_REG = /^[0-9a-fA-F]{24}$/;

module.exports.OBJECT_ID_REG = OBJECT_ID_REG;
module.exports.EMAIL_REG = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
module.exports.PASSWORD_REG = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{10,}$/;
module.exports.HEX_COLOR_REG = /^#[A-Fa-f0-9]{6}$/;
module.exports.USER_NAME_REG = /^[a-zA-Z0-9_-]{6,20}$/;


module.exports.isObjectNullOrEmpty = (obj) => {
  if (obj === null || obj === undefined || Object.getOwnPropertyNames(obj).length === 0) {
    return true;
  }
  return false;
};

module.exports.isObjectId = (id) => {
  const regExp = new RegExp(OBJECT_ID_REG)
  if (id === null || id === undefined || id === '' || !regExp.test(id)) {
    return false;
  }
  return true;
};

module.exports.resFun = (res, message, data = null) => {
  res.status(200);
  res.json({
    status: 'Success',
    message: message,
    data: data
  });
};



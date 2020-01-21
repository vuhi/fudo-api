const resFun = (res, message, data = null) => {
  res.status(200);
  res.json({
    status: 'Success',
    message: message,
    data: data
  });
};

module.exports = { resFun };

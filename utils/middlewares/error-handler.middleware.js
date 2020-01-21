module.exports = async (err, req, res, next) => {
  res.status(err.statusCode || 500);
  res.json({
    status: 'error thrown!',
    message: err.message,
    data: err.originalError || null
  });
  next();
};

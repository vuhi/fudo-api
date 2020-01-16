const router = require('express').Router();

router.get('/all', async (req, res, next) => {
  res.status(200).json('Test!');
});

module.exports = router;

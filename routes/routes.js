const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const errorHandler = require('../utils/middlewares/error-handler.middleware')

const tagColorRoutes = require('../routes/tag-color.routes');
const statusRoutes = require('../routes/status.routes');
const roleRoutes = require('../routes/role.routes');
const userRoutes = require('../routes/user.routes');
const recipeRoutes = require('../routes/recipe.routes');

module.exports = (app) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors());
  app.use(morgan('dev'));

  // ROUTES
  // app.use('/api/recipes', recipeRoutes);
  app.use('/api/tag-colors', tagColorRoutes);
  app.use('/api/statuses', statusRoutes);
  app.use('/api/roles', roleRoutes);
  app.use('/api/users', userRoutes);
  app.use('/api/recipes', recipeRoutes);

  // GLOBAL ERROR HANDLER, SHOULD BE PLACE AT THE END
  app.use(errorHandler);
};

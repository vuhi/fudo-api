const express = require('express');
require('express-async-errors');
const cors = require('cors');
const morgan = require('morgan');
const dbConnect = require('./db/db.connection');
const errorHandler = require('./utils/middlewares/error-handler.middleware');
const { PORT, CONNECTION_STRING } = require('./utils/config');

const recipeRoutes = require('./routes/recipe.routes');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan('dev'));

dbConnect(CONNECTION_STRING);

app.use('/api/recipes', recipeRoutes);

// GLOBAL ERROR HANDLER, SHOULD BE PLACE AT THE END
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running in [${process.env.NODE_ENV}] mode on port: ${PORT}`));

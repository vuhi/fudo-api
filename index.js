const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dbConnect = require('./db/db.connection');
const { PORT, CONNECTION_STRING } = require('./utils/config');

const recipeRoutes = require('./routes/recipe.routes');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan('dev'));

dbConnect(CONNECTION_STRING);

app.use('/api/recipes', recipeRoutes);

app.listen(PORT, () => console.log(`Server running in [${process.env.NODE_ENV}] mode on port: ${PORT}`));

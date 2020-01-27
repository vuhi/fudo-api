const express = require('express');
const { PORT, CONNECTION_STRING } = require('./utils/config');
require('express-async-errors');

const app = express();

// SET UP ROUTES
require('./routes/routes')(app);

// SET UP DB CONNECTION
require('./db/db.connection')(CONNECTION_STRING);

app.listen(PORT, () => console.log(`Server running in [${process.env.NODE_ENV}] mode on port: ${PORT}`));

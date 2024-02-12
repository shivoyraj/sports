const express = require('express');
const routes = require('./routes/router');

const db = require('./configs/mysql'); // Import MySQL connection

const app = express();
const PORT = process.env.PORT || 3000;

app.use('/', routes);

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
const express = require('express');
const router = require('./routes');

const app = express();

app.use(express.json());

app.use('/api/1.0', router);

module.exports = app;

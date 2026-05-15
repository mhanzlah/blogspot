const express = require('express');

const app = express();

app.use('/', (req, res) => {
    res.send('Blogspot service is up and running ;)')
});

module.exports = app;

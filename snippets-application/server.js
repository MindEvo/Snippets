const express = require('express');

const app = express();

const PORT = 8080;

app.use(express.json());

// require in resource routes
const users = require('./api/routes/users.js');
const snippets = require('./api/routes/snippets.js');
const bookmarks = require('./api/routes/bookmarks.js');

// add the resource route to our express app
// localhost:8080/users
app.use('/users', users);
app.use('/snippets', snippets);
app.use('/bookmarks', bookmarks);

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
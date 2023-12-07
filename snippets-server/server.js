// 1. run: npm install
// 2. use: the thunder client JSON file and import into Thunder Client Collections
// 3. run: npm run start

const express = require('express');
const cors = require('cors');
const mongo = require('./mongo/index.js');
const app = express();

const PORT = 8080;
const options = { exposedHeaders: ['Authorization'] };

app.use(cors(options));
app.use(express.json());

// require in resource routes
const users = require('./api/users/users.routes.js');
const snippets = require('./api/snippets/snippets.routes.js');
const bookmarks = require('./api/bookmarks/bookmarks.routes.js');

// add the resource route to our express app
// localhost:8080/users
app.use('/users', users);
app.use('/snippets', snippets);
app.use('/bookmarks', bookmarks);

app.listen(PORT, async () => {
    console.log(`Server is listening on port ${PORT}`);
    await mongo.connectDB();
});
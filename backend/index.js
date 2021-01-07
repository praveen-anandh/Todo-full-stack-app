const express = require('express');

const cors = require('cors');

const app = express();

const mongoose = require('mongoose');

require('dotenv/config');

const bodyParser = require('body-parser');

const postsROute = require('./routes/posts');

const todosRoute = require('./routes/Todos');

app.use(cors());

app.use(bodyParser.json());

app.use('/todos',todosRoute);

app.use('/posts', postsROute);

app.get('/', (req, res) => {
    res.send(' we are on home');
});

mongoose.connect(
    "mongodb+srv://test:test@cluster0.e35s5.mongodb.net/rest?retryWrites=true&w=majority", 
    { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    return console.log('db is connected');
});

app.listen(3001);
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const routes = require('./routes.js');

const app = express();
const server = require('http').Server(app);

const io = require('socket.io')(server);

mongoose.connect('mongodb+srv://omnistack:omnistack@cluster0-9vl1t.mongodb.net/cruds?retryWrites=true&w=majority', { 
    useNewUrlParser: true,
    useUnifiedTopology: true 
});

app.use(cors());
app.use(express.json());
app.use(routes);

server.listen(3001);
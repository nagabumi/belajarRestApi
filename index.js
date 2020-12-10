const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cons = require('cons');
const app = express();

// routes
const authRoute = require('./routes/users');
const itemRoute = require('./routes/items');


dotenv.config();

// connect to db
mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true}, ()=>{
    console.log('connected to db!')
});

// middleware
app.use(bodyParser.json());
app.use('/api/user', authRoute);
app.use('/api/item', itemRoute);

// listen
app.listen(3000, ()=> console.log('server is up and running!'));
const cors = require('cors');
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser')

const errorMiddleware = require('./middlewares/errors')

app.use(express.json());
app.use(cookieParser());

app.use("*",cors({
    origin: true,
    credentials: true,
}));

//Import all routes
const auth = require('./routes/auth');
const event = require('./routes/event');



app.use('/api/v1', auth);
app.use('/api/v1', event);



//middleware to handle error
app.use(errorMiddleware)

module.exports = app
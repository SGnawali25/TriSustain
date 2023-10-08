const cors = require('cors');
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser');

const errorMiddleware = require('./middlewares/errors')

app.use(express.json({ limit: "10mb"}));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true}));
app.use(bodyParser.json({ limit: "10mb"}));


app.use("*",cors({
    origin: true,
    credentials: true,
}));

//Import all routes
const auth = require('./routes/auth');
const event = require('./routes/event');
const userEvents = require('./routes/userEvent');



app.use('/api/v1', auth);
app.use('/api/v1', event);
app.use('/api/v1', userEvents);



//middleware to handle error
app.use(errorMiddleware)

module.exports = app
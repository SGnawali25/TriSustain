const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const eventSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter event name'],
        maxLength: [30, 'Event name cannot exceed 30 characters']
    },
    eventStartDate: {
        type: Date,
        required: [true, 'Please enter your event Start Date']
    },
    eventEndDate: {
        type: Date,
        required: [true, 'Please enter your event End Date']
    },
    host: {
        type: String,
        required: [true, 'Please enter your name']
    },
    location: {
        type: String,
        required: [true, 'Please enter the location for the event']
    },
    description: {
        type: String,
        required: [true, 'Please enter the description for the event']
    },
    imageOne: {
        type: String
    },
    imageTwo: {
        type: String
    },
    xToEarn: {
        type: String,
        required: [true, 'Please enter your xToEarn']
    }
})
module.exports = mongoose.model('Event', eventSchema);
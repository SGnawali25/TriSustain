const mongoose = require('mongoose');
const {Schema} = require("mongoose");

const userEventsSchema = new mongoose.Schema({
    userIdForEvent: {type: Schema.Types.ObjectId, ref: "User"},
    eventIdForEvents: {type: Schema.Types.ObjectId, ref: "UserModel"},
})
module.exports = mongoose.model('UserEvents', userEvents);
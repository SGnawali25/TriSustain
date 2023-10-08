const express = require('express');
const router = express.Router();

const {
    userRegistersForEvent
} = require('../controllers/userEventsController');

router.route('/user/:userId/event/:eventId').post(userRegistersForEvent);

module.exports = router
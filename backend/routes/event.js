const express = require('express');
const router = express.Router();
const {isAuthenticatedUser, authorizedRoles} = require('../middlewares/auth')

const {
    registerEvent, 
    getEventById, 
    getAllEvents
    } = require('../controllers/eventController');

router.route('/register/event').post(registerEvent);
router.route('/events').get(getAllEvents);
router.route('/event/:id').get(getEventById);

module.exports = router
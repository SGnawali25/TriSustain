const express = require('express');
const router = express.Router();
const {isAuthenticatedUser, authorizedRoles} = require('../middlewares/auth')

const {
    registerEvent, 
    getEventById, 
    getAllEvents,
    updateEvent,
    uploadFirstPicInEvent
    } = require('../controllers/eventController');

router.route('/register/event').post(registerEvent);
router.route('/events').get(getAllEvents);
router.route('/event/:id').get(getEventById);
router.route('/event/registration').post(updateEvent)
router.route('/event/:e_id').put(uploadFirstPicInEvent);

module.exports = router
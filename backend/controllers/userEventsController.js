const UserEvents = require('../models/userEvents');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');

//Register an event
exports.userRegistersForEvent = catchAsyncErrors( async(req, res, next) => {
        const {userId, eventId} = req.body;

        //whether user entered email and password
        if(!userId || !eventId){
            return next(new ErrorHandler('Please enter event details properly', 400));
        }

        const userEvent = await UserEvents.create({
            userId,
            eventId
        })


        res.status(200).json({
            success:"true",
            userEvent
        })
    }
)
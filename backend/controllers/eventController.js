const Event = require('../models/events');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');

//Register an event
exports.registerEvent = catchAsyncErrors( async(req, res, next) => {
        const {name, eventStartDate, eventEndDate, host, location, description, xToEarn, price} = req.body;

        //whether user enterd email and password
        if(!name || !eventStartDate || !eventEndDate, !host, !location, !description, !xToEarn, !price){
            return next(new ErrorHandler('Please enter event details properly', 400));
        }

        const event = await Event.create({
            name,
            eventStartDate,
            eventEndDate,
            host,
            location,
            description,
            xToEarn,
            price
        })

        
        res.status(200).json({
            success:"true",
            event
        })
    }
)

//update event before image

exports.updateBeforeImage = catchAsyncErrors(async(req, res, next) => {
    const event = await Event.findById(req.event.id)
    if (!event){
        return next(new ErrorHandler('there not a such event', 404))
    }

    event.imageOne = req.beforeImage;
    await event.save();

    res.status(200).json({
        success:true,
        message: "Image added successfully"
    })




})

// gives the event by event id
exports.getEventById = catchAsyncErrors( async(req, res, next) => {
    const event = await Event.findById(req.event.id);

    res.status(200).json({
        success: true,
        event
    })
})

// gives all events
exports.getAllEvents = catchAsyncErrors( async(req, res, next) => {
    const events = await Event.find();

    res.status(200).json({
        success: true,
        events
    })
})
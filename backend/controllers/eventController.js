const Event = require('../models/events');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');

//Register an event
exports.registerEvent = catchAsyncErrors( async(req, res, next) => {
        const {name, eventStartDate, eventEndDate, host, location, description, xToEarn, price, eventType} = req.body;
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
            price,
            eventType: eventType
        })

        
        res.status(200).json({
            success:"true",
            event
        })
    }
)

//update event before image

// exports.updateBeforeImage = catchAsyncErrors(async(req, res, next) => {
//     const event = await Event.findById(req.event.id)
//     if (!event){
//         return next(new ErrorHandler('there not a such event', 404))
//     }

//     event.imageOne = req.beforeImage;
//     await event.save();

//     res.status(200).json({
//         success:true,
//         message: "Image added successfully"
//     })




// })

// gives the event by event id
exports.getEventById = catchAsyncErrors( async(req, res, next) => {
    const event = await Event.findById(req.params.id);

    res.status(200).json({
        success: true,
        event
    })
})

//update event
exports.updateEvent = catchAsyncErrors( async(req, res, next) => {
    const {eventId, userId} = req.body
    let event = await Event.findById(req.body.eventId);

    if (!event){
        return next(new ErrorHandler('there is not a such event', 404))
    }

    event.registration = true;
    event.registrar = userId
    await event.save();

    event = await Event.findById(req.body.id);

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


// Use the api keys by specifying your api key and api secret


//Register an event
exports.uploadFirstPicInEvent = catchAsyncErrors( async(req, res, next) => {
    const pinataSDK = require('@pinata/sdk');
    const fs = require("fs");
    const pinata = new pinataSDK({ pinataApiKey: '11a1d8ac65b3f07d91e5', pinataSecretApiKey: '35b263947f09aaed8f5bb1b21ccf95c95057183e8f28e94ffef8f03d9dbf8d22' });

    const {imageOne} = req.body;


    if(!imageOne){
            return next(new ErrorHandler('Please enter event details properly', 400));
        }


    const readableStreamForFile = fs.createReadStream(imageOne);
    const options = {
        pinataMetadata: {
            name: "TempImage",
            keyvalues: {
                customKey: 'customValue',
                customKey2: 'customValue2'
            }
        },
        pinataOptions: {
            cidVersion: 0
        }
    };

        const response = await pinata.pinFileToIPFS(readableStreamForFile, options)

        const check =  await Event.findByIdAndUpdate(req.params.e_id, {imageOne: response.IpfsHash})

        res.status(200).json({
            success:"true",
            response
            
        })
    }
)
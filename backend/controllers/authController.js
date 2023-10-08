const User = require('../models/user');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const sendToken = require('../utils/jwtToken');
const crypto = require('crypto');
const bcrypt = require('bcryptjs')




//Register a user
exports.registerUser = catchAsyncErrors( async(req, res, next) => {
    const {name, email, password, role} = req.body;

    const user = await User.create({
        name,
        email,
        password, 
        role
    })

    //whether user enterd email and password
    if(!email || !password || !name){
        return next(new ErrorHandler('Please enter name, email, and password properly', 400));
    }

    sendToken(user, 200, "", res)

    
}
)

//login based on user email and password
exports.loginUser = catchAsyncErrors( async(req, res, next) => {
    const {email, password} = req.body;

    //whether user enterd email and password
    if(!email || !password){
        return next(new ErrorHandler('Please enter email and password', 400));
    }

    //finding user in our database
    const user = await User.findOne({email}).select('+password')

    if (!user){
        return next(new ErrorHandler("Invalid email or password", 401));
    }

    //checks if password is correct or not
    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched){
        return next(new ErrorHandler("Invalid email or password", 401));
    }



    sendToken(user, 200, "", res)
})

//logout user
exports.logout = catchAsyncErrors( async(req, res, next) => {
    const options = {
        expires: new Date(Date.now()),
        httpOnly: true,
        path:'/'
    }

    res.cookie('token', null, options);

    res.status(200).json({
        success: true,
        message: 'Successfully logged out'
    })
})


// gives the user their own information
exports.userProfile = catchAsyncErrors( async(req, res, next) => {
    const user = await User.findById(req.user.id);

    res.status(200).json({
        success: true,
        user
    })
})


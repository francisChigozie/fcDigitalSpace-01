const ErrorResponse = require('../utils/errorResponse')
const asyncHandler = require('../middleware/async')
const Contact = require('../models/Contact')
//const sendmail = require('./sendmail.js')

//@desc  Craete A Hotel Contact Form
//@route  POST /api/v1/books
//@access  Public

exports.createHotelcontact = asyncHandler(async (req, res, next) => {
    const {email} = req.body;
         //sendmail(email)
    const hotelcontact = await Hotelcontact.create(req.body)

    res.status(201).json({
        success: true,
        data: hotelcontact
    })
})

//@desc  Get Hotel Contact Form
//@route  POST /api/v1/books
//@access  Public

exports.getHotelcontact = asyncHandler(async (req, res, next) => {
    
    const hotelcontact = await Hotelcontact.find();

    res.status(201).json({
        success: true,
        data: hotelcontact
    })
})
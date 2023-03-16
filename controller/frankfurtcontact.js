const ErrorResponse = require('../utils/errorResponse')
const asyncHandler = require('../middleware/async')
const Frankfurtcontact = require('../models/FrankfurtContact')
//const sendmail = require('./sendmail.js')

//@desc  Craete A Hotel Contact Form
//@route  POST /api/v1/books
//@access  Public

exports.createFrankfurtcontact = asyncHandler(async (req, res, next) => {
    //const {email} = req.body;
         //sendmail(email)
    const frankfurtcontact = await Frankfurtcontact.create(req.body)

    res.status(201).json({
        success: true,
        data: frankfurtcontact
    })
})

//@desc  Get Hotel Contact Form
//@route  POST /api/v1/books
//@access  Public

exports.getFrankfurtcontact = asyncHandler(async (req, res, next) => {
    
    const frankfurtcontact = await Frankfurtcontact.find();

    res.status(201).json({
        success: true,
        data: frankfurtcontact
    })
})
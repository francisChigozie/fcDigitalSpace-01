const ErrorResponse = require('../utils/errorResponse')
const asyncHandler = require('../middleware/async')
const Contact = require('../models/Contact')
//const sendmail = require('./sendmail.js')

//@desc  Craete A Contact
//@route  POST /api/v1/contacts
//@access  Public

exports.createContact = asyncHandler(async (req, res, next) => {
    //const {email} = req.body;
        // sendmail(email)
    const contact = await Contact.create(req.body)

    res.status(201).json({
        success: true,
        data: contact
    })
})
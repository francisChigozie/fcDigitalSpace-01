const ErrorResponse = require('../utils/errorResponse')
const asyncHandler = require('../middleware/async')
const Book = require('../models/Book')

//@desc  Craete A Book
//@route  POST /api/v1/books
//@access  Public

exports.createBook = asyncHandler(async (req, res, next) => {

         const newBook = await Book.create(req.body)

    newBook.save( (err) => {
        if (err) {
            res.type('html').status(500);
            res.send('Error:', err);
        }else{
            res.render('createdbook', {book: newBook});
        }
    });

            res.status(201).json({
                success: true,
                data: newBook
            });
    

})
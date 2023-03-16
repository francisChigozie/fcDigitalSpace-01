const ErrorResponse = require('../utils/errorResponse')
const asyncHandler = require('../middleware/async')
const Book = require('../models/Book')

//@desc  Craete A Book
//@route  POST /api/v1/books
//@access  Public

 exports.createBook = asyncHandler(async (req, res, next) => {
    
        // sendmail(email)
  //console.log(title)
         const newBook = await Book.create(req.body)
  
         newBook.save()
         console.log(newBook)
         /* .then((result) => {
            res.redirect('./routes/routes/getCreatedBook')
            //res.render('createdbook')
         })
         .catch((err) => {
            console.log(err)
         }) */
          res.render('createdbook') 
            res.status(201).json({
                success: true,
                data: newBook
            }) 
    })

//@desc  Update Book 
//@route  PUT /books
//@access  Private 
exports.putBook = asyncHandler(async (req, res, next) => {
    
    let book = await Book.findById(req.params.id)

    if(!book){
        return next(
            new ErrorResponse(`No Book with id of ${req.params.id}`),
        404
         )}   

         book = await Book.findByIdAndUpdate(req.params.id, req.body, {
             new: true,
             runValidators: true
         })

    res.status(200).json({
        success: true,
        data: book
    })
})

//@desc  Update Book 
//@route  PUT /books
//@access  Private 
exports.deleteBook = asyncHandler(async (req, res, next) => {
    
    let book = await Book.findById(req.params.id)

    if(!book){
        return next(
            new ErrorResponse(`No Book with id of ${req.params.id}`),
        404
         )}   

         book = await Book.findByIdAndDelete(req.params.id, req.body, {
             new: true,
             runValidators: true
         })

    res.status(200).json({
        success: true,
        data: book
    })
})

//@desc  Get Book Form
//@route  GET /books
//@access  Public
exports.getBook = asyncHandler(async (req, res, next) => {
    
    const newBook = await Book.find();

    res.status(201).json({
        success: true,
        data: newBook
    })
})

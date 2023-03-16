const express = require('express')
const { createBook,getBook,putBook,deleteBook } = require('../controller/books')
const Book = require('../models/Book') 

const router = express.Router({mergeParams: true})
const routerID = express.Router({mergeParams: true})

router
.route('/')
.post(createBook)
.get(getBook)

routerID
.route('/:id')
.put(putBook)
.delete(deleteBook)



module.exports = router;
var express = require('express')
var router = express.Router()
const path = require('path')
//const sendmail = require('./sendmail.js.js.js')
const Contact = require('../models/Contact')
const Hotelcontact = require('../models/HotelContact')
const Frankfurtcontact = require('../models/FrankfurtContact')
const Book = require('../models/Book');
const ErrorResponse = require('../utils/errorResponse')
const asyncHandler = require('../middleware/async')
const advancedResults = require('../middleware/advancedResult')

//Home
router.get("/", (req, res) => {
    res.render("index", {title:'Home'});
}) 

// About Page
router.get('/about', function (req, res) {
    res.render("about", {title:'About'});
}); 

//Resume
router.get('/resume', function (req, res) {
    res.render("resume", {title:'Resume'});
}); 

router.get("/blog", (req, res) => {
    res.render("https://github.com/francisChigozie", {title:'Blog'});
}) 

////////////////////////////////////////////////////////////////////////////////////
// Hotel Lounge
router.get('/hotel', function (req, res) {
    res.render("./hotel/hotel", {title:'Welcome'});
}); 

router.get('/hotelabout', function (req, res) {
    res.render("./hotel/about", {title:'About'});
}); 

router.get('/hotelcontact', async function(req, res) {
    res.render("./hotel/contact", {title:'Contact'});

    const hotelcontact = await  Hotelcontact.find();

    res.status(201).json({
        suceess: true,
        data: hotelcontact
    })
}); 

router.post('/hotelcontact', (asyncHandler(async (req, res, next) => {
  //const {email} = req.body;
         //sendmail(email)
  try{
     const hotelcontact = await Hotelcontact.create(req.body)
     
   //hotelcontact.save(() => {});
  /*  res.render('hotelform', {data: hotelcontact,
      success: true}); */

  }catch(err){
      error.message(err)
  }

})))

/////////////////////////////////////////////////////////////////////////////////////////////
// Frankfurt
router.get('/frankfurt', function (req, res) {
    res.render("./frankfurt/frankfurt", {title:'Home'});
}); 

router.get('/frankfurtblog', function (req, res) {
    res.render("./frankfurt/blog", {title:'Blog'});
}); 

router.get('/frankfurtpost1', function (req, res) {
    res.render("./frankfurt/post1", {title:'Post One'});
}); 

router.get('/frankfurtpost2', function (req, res) {
    res.render("./frankfurt/post2", {title:'Post Two'});
}); 

router.get('/frankfurtpost3', function (req, res) {
    res.render("./frankfurt/post3", {title:'Post Three'});
}); 

//Frankfurt Ledger
router.post('/frankfurtcontact', (asyncHandler(async (req, res, next) => {
    //const {email} = req.body;
          // sendmail(email)
    try{
       const frankfurtcontact = await Frankfurtcontact.create(req.body)

     /* frankfurtcontact.save(() => {

            res.render('frankfurt', {data: frankfurtcontact,
              success: true});
         
    });*/

    }catch(err){
        error.message(err)
    }

})))


////////////////////////////////////////////////////////////////////////////
// Number Guesser
router.get('/guess', function (req, res) {
    res.render("./html/guess", {title:'Home'});
}); 

//////////////////////////////////////////////////////////////////////////////
//Hambuger Menu
router.get('/hambuger', function (req, res) {
    res.render("./html/hambuger", {title:'Home'});
}); 

///////////////////////////////////////////////////////////////////////////////////
//Knowledger Resume
router.get('/knowledge', function (req, res) {
    res.render("./html/knowledge", {title:'Home'});
}); 

////////////////////////////////////////////////////////////////////////////////////
// Loan Calculators
router.get('/calculate', function (req, res) {
    res.render("./html/loancalc", {title:'Home'});
}); 

///////////////////////////////////////////////////////////////////////////////////////
// Other Satatic Designs
router.get('/satdesign', function (req, res) {
    res.render("./html/sdesign", {title:'Home'});
}); 

//Presentation
router.get('/presentation', function (req, res) {
    res.render("./html/presentation", {title:'Home'});
}); 

//Drop Down Menu
router.get('/dropdown', function (req, res) {
    res.render("./html/dropdown", {title:'Home'});
}); 

///////////////////////////////////////////////////////////////////////////////////
// Object-Oriented-Programming 
// OOPROG
router.get('/ooprog', function (req, res) {
    res.render("./obj-ori-pro/oop", {title:'Home'});
}); 

//JAVA
router.get('/java', function (req, res) {
    res.render("./obj-ori-pro/java", {title:'Home'});
});

//PYTHON
router.get('/python', function (req, res) {
    res.render("./obj-ori-pro/python", {title:'Home'});
});

//NODE
router.get('/node', function (req, res) {
    res.render("./obj-ori-pro/node", {title:'Home'});   
});

//////////////////////////////////////////////////////////////////////////////////
 // BackDev
 router.get('/backdev', function (req, res) {
    res.render("./html/backdev", {title:'Home'});
});  

router.get('/bookform', function (req, res) {
    res.render("./html/bookform", {title:'Home'});
}); 

//@desc  Craete New Book
//@route  POST /api/v1/book
//@access  Public

router.post('/createbook', asyncHandler(async(req, res, next) => {

       const newBook = await Book.create(req.body)

  newBook.save( (err) => {
      if (err) {
          res.type('html').status(500);
          res.send('Sorry ! This is already published:', err);
      }else{
           res.render('createdbook', {book: newBook});
      }
  });

}))

//GET ALL BOOKS
router.get('/all', (req, res) => {
  Book.find((err, book) => {
      if (err) {
          res.type('html').status(500)
          res.send('Error:', err)
      }else if (book.length == 0) {
           res.type('html').status(200)
           res.send('There is no book created right now.')
      }else{
           res.render('showAll', {book: book});
      }
  });
});

//BOOK SEARCH
router.get('/booksearch', function (req, res) {
    res.render("./html/booksearch", {title:'Home'});
}); 

//SEARCH FOR BOOKS
router.post('/api', (req, res) => {

  var query = {};
  if (req.query.title)
 query.title = {$regex: req.query.title};
  query.title = req.query.title;
  if (req.query.name)
  query['authors.name'] = {$regex: req.query.name};
  query['authors.name'] =  req.query.name;
  if (req.query.year)
  query.year = req.query.year;

  if (Object.keys(query).length != 0) {
      Book.find(query, (err, books) => {
          if (!err)
          res.json(books);
          else {
              console.log(err)
              res.json({});
          }
      });
  }else {
        //res.json({});
        res.render('books', {books: books});
  }

})

router.post('/search', (req, res) => {
  if (req.body.which == 'all') {
      searchAll(req, res);
  }else if(req.body.which == 'any') {
      searchAny(req, res);
  }else{
      searchAll(req, res);
  }
})

function searchAll(req, res) {

  var query = {};

  if (req.body.title) query.title = req.body.title;
  if (req.body.year) query.year = req.body.year;
  if (req.body.name) {
      query['authors.name'] = req.body.name;
  }
  console.log(query)

  Book.find(query, (err, books) => {
      if (err) {
          res.type('html').status(500);
          res.send('Error:', err)
      }else{
          res.render('books', {books: books});
      }
  })
}

function searchAny(req, res) {

  var terms = [];

  if (req.body.title) 
  terms.push({title: { $regex: req.body.title } });
  if (req.body.year) 
  terms.push({year: req.body.year});
  if (req.body.name) 
      terms.push({'authors.name': req.body.name});


  var query = {$or : terms};
  console.log(query)

  Book.find(query, (err, books) => {
      if (err) {
          res.type('html').status(500);
          res.send('Error:', err)
      }else{
          res.render('books', {books: books});
      }
  }).sort( { 'title': 'asc'} );
}

//////////////////////////////////////////////////////////////////////////////
//PROJECTS PAGE
router.get('/project', function (req, res) {
      res.sendFile(path.join(__dirname, '/html/projects.html'))
}); 

//////////////////////////////////////////////////////////////////////////

//Contact Infors
router.get('/contact', function (req, res) {
    res.render("contact", {title:'Contact'});
}); 
/////////////////////////////////////////////////////////////////////////////////////////
//@desc  Craete A Contact with Send Mail
//@route  POST /api/v1/contact
//@access  Public

router.post('/contact', asyncHandler(async(req, res, next) => {
         //const {email} = req.body;
         //sendmail(email)

          const newContact = await Contact.create( req.body)

          /* newContact.save( (err) => {
            if (err) {
                res.type('html').status(500);
               // res.render('errors', err)
               res.send('Error:', err);
            }else{
                res.render('created', {contact: newContact});
            }
        }); */
}))

//@desc  Get A Single  User Contact
//@route  GET /api/v1/contacts/:id
//@access  Private/admin

router.get('/contact/:id', asyncHandler(async(req, res, next) => {
     const newContact = await Contact.findById(req.params.id)

     res.status(200).json({
        success: true,
        data: newContact
    })
}))

//@desc  Get All User
//@route  GET /api/v1/auth/users
//@access  Private/admin

router.get('/infocontact', asyncHandler(async(req, res, next) => {  // /api/v1/contact'
    let query;

    if(req.params.id) {
  query = await Contact.find({contact: req.params.id});
    return res.status(200).json({
        suceess: true,
        count: contacts.length,
        data: contacts
    })
    }else{
        //res.status(200).json(advancedResults); 
        query = Contact.find()
    }
    
    const contacts = await query;

    //Pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 3;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const total = await Contact.countDocuments();

    query = query.skip(startIndex).limit(limit)

     //Pagination Result
    const pagination = {} ;

    if(endIndex < total) {
        pagination.next = {
            page: page + 1,
            limit
        }
    }
 
    if(startIndex > 0) {
        pagination.prev = {
            page: page -1,
            limit
        }
    }

    res.status(200).json({
        success: true,
        count: contacts.length,
        pagination: pagination,
        data: contacts
    })
    
}))

//@desc Update Review
//@route  PUT/api/v1/contact/:id
//@access private

router.put('/infocontact/:id', asyncHandler(async(req, res, next) => {
     let contact = await Contact.findById(req.params.id)

    if(!contact){
        return next(
            new ErrorResponse(`No User Contact with id of ${req.params.id}`),
        404
         )}   

         contact = await Contact.findByIdAndUpdate(req.params.id, req.body, {
             new: true,
             runValidators: true
         })

    res.status(200).json({
        success: true,
        data: contact
    })
}))

//@desc Delete Contact
//@route  Delete/api/v1/contact/:id
//@access private

router.delete('/infocontact/:id', asyncHandler(async(req, res, next) => {
    const contact= await Contact.findById(req.params.id)

    if(!contact){
        return next(
            new ErrorResponse(`No contact with id of ${req.params.id}`),
        404
         )}

         await contact.remove

    res.status(200).json({
        success: true,
        data: 'Contact Deleted'
    })
}))
///////////////////////////////////////////////////////////////////////////
/*
router.post('/contact',async (req, res) => {
        const {email} = req.body;
         sendmail(email)
 try{ 
      await Contact.create(req.body);
      res.send('New contact is inserted');
    } 
      catch (err) { console.error(err.message) }
})
*/
 

//Deutsch
router.get('/deutsch', function (req, res) {
        const name = req.body;
        console.log(name)
      res.render('deutsch')
}); 

//Form About Animals And form
router.get('/animal', function (req, res) {
      res.sendFile(path.join(__dirname, '/html/list.html'))
}); 

//form.html
router.get('/formAnimal', function (req, res) {
      res.sendFile(path.join(__dirname, '/html/form.html'))
}); 

//book.html
router.get('/animal', function (req, res) {
      res.sendFile(path.join(__dirname, '/html/list.html'))
}); 
router.post('/handleForm', (req, res) => {

     var name = req.body.username;
     var animals = [].concat(req.body.sapian);
   console.log(animals)
     res.render('showAnimals', {name: name, animals:animals});

    })

////////////////////////////////////////////
//404 PAGE
router.get(/*default*/ (req, res) => {
    res.render('p4')
})
    
module.exports = router;
const express = require('express')
const { createContact } = require('../controller/contacts')
const Contact= require('../models/Contact') 

const router = express.Router({mergeParams: true})

router
.route('/') 
.post(createContact)


module.exports = router;
const express = require('express')
const { createFrankfurtcontact,
        getFrankfurtcontact } = require('../controller/frankfurtcontact')
//const HotelContact= require('../models/HotelContact') 

const router = express.Router({mergeParams: true})

router
.route('/') 
.post(createFrankfurtcontact)
.get(getFrankfurtcontact)


module.exports = router;
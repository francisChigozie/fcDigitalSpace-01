const express = require('express')
const { createHotelcontact,
        getHotelcontact } = require('../controller/hotelcontact')
//const HotelContact= require('../models/HotelContact') 

const router = express.Router({mergeParams: true})

router
.route('/') 
.post(createHotelcontact)
.get(getHotelcontact)


module.exports = router;
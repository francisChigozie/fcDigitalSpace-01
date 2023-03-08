var mongoose = require('mongoose')

var Schema = mongoose.Schema;

var frankfurtSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Please enter your full name']
    },
    email: {
        type: String,
        required: [true, 'Please add an email'],
        unique: [false, 'This email already exist '],
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please add a valid email'
        ]
    },
    phone: {
        type: Number,
    required: [true, 'Please enter your phone number']
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
});


module.exports = mongoose.model('FrankfurtContact', frankfurtSchema);
var mongoose = require('mongoose')

var Schema = mongoose.Schema;

var contactSchema = new Schema({
    user: {
        type: String,
    },
     subject: {
        type: String,
    },
    email: {
        type: String,
    },
     phone: {
        type: String,
    },
    text: {
        type: String,
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
},
{
     toJSON: { virtuals: true},
    toObject: { virtuals: true}
});


module.exports = mongoose.model('Contact', contactSchema);
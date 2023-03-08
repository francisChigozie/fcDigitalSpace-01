var mongoose = require('mongoose')

var Schema = mongoose.Schema;

var authorSchema = new Schema({
    name: {
        type: String,
        required: [false, 'Please add a name']
    },
    affiliation: {
        type: String,
        required: [false, 'Please add affiliation name']
    }
});

var bookSchema = new Schema({
    title: {type: String, 
        required: [true, 'Please add the year of publication'],
         unique: [false, 'Sorry ! This title is already published ']},
    year: {
        type: Number,
        required: [true, 'Please add year']
    },
    authors: [authorSchema]
});

module.exports = mongoose.model('Book', bookSchema);
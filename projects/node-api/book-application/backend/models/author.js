const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    name:String,
    age:Number
})


module.exports = mongoose.model('author',bookSchema)
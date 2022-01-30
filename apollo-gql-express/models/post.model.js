const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title:String,
    description:String,
})


const post = mongoose.model('post',postSchema);
module.exports = post;

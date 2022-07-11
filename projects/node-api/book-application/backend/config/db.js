const mongoose = require('mongoose')

mongoose.connect("mongodb://localhost/graphql")
    .then(() => {
        console.log('databse connected');
    })
    .catch(err => {
        console.log('error in databse connectivity', err);
    })
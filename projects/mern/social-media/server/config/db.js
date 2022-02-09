const mongoose = require('mongoose');

const connectDB = async () => {
    mongoose.connect(process.env.MONGODB_URL, { keepAlive: 1 });
    const db = mongoose.connection;

    db.once('open', () => {
        console.log('connected to database');
    })

    db.once('error', () => {
        console.log('unable to connect with database');
    })
 
}

module.exports = connectDB;
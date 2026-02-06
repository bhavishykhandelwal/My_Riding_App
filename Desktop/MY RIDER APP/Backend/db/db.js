const mongoose = require('mongoose');

function connectToDb() {
    if (!process.env.DB_CONNECT) {
        throw new Error('DB_CONNECT environment variable is not defined');
    }

    return mongoose.connect(process.env.DB_CONNECT)
        .then(() => {
            console.log('Connected to DB');
        })
        .catch((err) => {
            console.error('DB connection error:', err);
        });
}

module.exports = connectToDb;

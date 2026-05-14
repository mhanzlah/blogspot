const mongoose = require('mongoose');

function connectDB(uri, onSuccess, onError) {
    mongoose.connect(uri)
        .then(() => onSuccess())
        .catch((err) => onError(err));
}

module.exports = connectDB;

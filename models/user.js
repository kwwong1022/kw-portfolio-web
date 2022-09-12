const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'username cannot be blank'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'password cannot be blank']
    },
    role: {
        type: String,
        required: [true, 'user role cannot be blank']
    },
    creationTime: {
        type: Date,
        required: [true, 'please add creation time']
    },
    modificationTime: {
        type: Date,
        required: [true, 'please add modification time']
    },
    email: {
        type: String,
        required: false
    }
})

module.exports = mongoose.model('User', UserSchema);
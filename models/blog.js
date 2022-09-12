const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema({
    status: {
        type: String,
        required: [true, 'status cannot be blank'],
    },
    type: {
        type: String,
        required: [true, 'type cannot be blank']
    },
    title: {
        type: String,
        required: [true, 'title cannot be blank']
    },
    description: {
        type: String,
        required: false
    },
    tags: {
        type: String,
        required: false
    },
    creationTime: {
        type: String,
        required: [true, 'please add creation time']
    },
    modificationTime: {
        type: String,
        required: [true, 'please add modification time']
    }
})

module.exports = mongoose.model('Blog', BlogSchema);
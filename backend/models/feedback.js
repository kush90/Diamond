const mongoose = require('mongoose');

const feedbackSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
        default: 'pending'
    }
},
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Feedback', feedbackSchema)
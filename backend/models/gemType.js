const mongoose = require('mongoose');

const gemTypeSchema = mongoose.Schema({

    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:"User"
    },
    name: {
        type: String,
        required: true,
    }
},
    {
        timestamps: true
    }
);

module.exports =  mongoose.model('gemType',gemTypeSchema)
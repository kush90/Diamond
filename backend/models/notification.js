const mongoose = require('mongoose');

const notificationSchema = mongoose.Schema({

    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    sender: {
        type:String
    },
    noti: {
        type: String,
        required: true,
    },
    item: {
        type:String
    }
},
    {
        timestamps: true
    }
);

module.exports =  mongoose.model('Notification',notificationSchema)
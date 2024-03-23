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
    },
    read: {
        type:Boolean,
        default:false
    }
},
    {
        timestamps: true
    }
);

module.exports =  mongoose.model('Notification',notificationSchema)
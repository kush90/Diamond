const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:"User"
    },
    name: {
        type: String,
        required: true,
    },
    productNumber: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    shortDescription: {
        type: String,
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:"Category"
    },
    gemTypeId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:"gemType"
    },
    price: {
        type: Number,
        required: true
    },
    status: {
        type:String,
        default:'active'
    },
    certificate:[ {
          type: Object,
          required: true
    }],
    images: [
        {
          type: Object,
          required: true
        },
    ],
    // index: {
    //     type:Number,
    //     required:true
    // }
},
    {
        timestamps: true
    }
);
module.exports =  mongoose.model('Product',productSchema)
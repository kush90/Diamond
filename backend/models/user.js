const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

const Schema = mongoose.Schema;
const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        unique: true
    },
    phoneNo: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
    },
    address: {
        type: String,
    },
    type: {
        type: String,
        default: 'Broker'
    },
    profile: [
        {
            type: Object,
            required: false
        },
    ]
},
    {
        timestamps: true
    }
);

userSchema.statics.signup = async function (name, password, phoneNo, email,address,files) {

    if (!name || !password || !phoneNo) {
        throw Error('All fields must be filled')
    }

    if (!validator.isStrongPassword(password)) {
        throw Error('Password is not strong enough');
    }

    const user = await this.findOne({ phoneNo });
    if (user) {
        throw Error('This phone number with user is already in use');
    }

    try {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        let imageInfo=[];
        if (files) {
            await files.map((file) => {
                imageInfo.push({
                    path: file.path,
                    name: file.filename,
                    type: file.mimetype
                })
            });
        }
        const newUser = await this.create({ name, password: hash, "profile": imageInfo, email, phoneNo,address });
        return newUser;
    }
    catch (error) {
         throw Error(error.message);
    }
}

userSchema.statics.login = async function (phoneNo, password) {
    if (!phoneNo || !password) {
        throw Error('All fields must be filled')
    }


    const matchUser = await this.findOne({ phoneNo });
    if (!matchUser) {
        throw Error('Incorrect phone no')
    }

    const matchPassword = await bcrypt.compare(password, matchUser.password);
    if (!matchPassword) {
        throw Error('Incorrect password')
    }
    return matchUser;
}
userSchema.statics.forgotPassword = async function (phoneNo, password) {
    try {
        if (!phoneNo || !password) {
            throw Error('All fields must be filled')
        }

        if (!validator.isStrongPassword(password)) {
            throw Error('Password is not strong enough');
        }

        const user = await this.findOne({ phoneNo });
        if (!user) {
            throw Error('User is not found !');
        }

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        user.password = hash;
        user.save();
        return "Password is changed successfully.Please try to login with new one.";
    } catch (error) {
        throw Error(error.message);
    }
}
module.exports = mongoose.model('User', userSchema)
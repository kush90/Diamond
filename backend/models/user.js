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

userSchema.statics.signup = async function (name, password, phoneNo, email, files) {

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
        let imageInfo;
        if (files) {
            imageInfo = await files.map((file) => {
                return {
                    path: file.path,
                    name: file.filename,
                    type: file.mimetype
                }
            });
        }
        const newUser = await this.create({ name, password: hash, profile: imageInfo, email, phoneNo });
        return newUser;
    }
    catch (error) {
         throw Error(error.message);
    }
}

userSchema.statics.login = async function (name, password) {
    if (!name || !password) {
        throw Error('All fields must be filled')
    }


    const matchUser = await this.findOne({ name });
    if (!matchUser) {
        throw Error('Incorrect name')
    }

    const matchPassword = await bcrypt.compare(password, matchUser.password);
    if (!matchPassword) {
        throw Error('Incorrect password')
    }
    return matchUser;
}
userSchema.statics.forgotPassword = async function (name, password) {
    try {
        if (!name || !password) {
            throw Error('All fields must be filled')
        }

        if (!validator.isStrongPassword(password)) {
            throw Error('Password is not strong enough');
        }

        const user = await this.findOne({ name });
        if (!user) {
            throw Error('Email is not found !');
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
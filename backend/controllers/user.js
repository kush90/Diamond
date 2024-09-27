const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const validator = require('validator');



const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '3d' });
}

const loginUser = async (req, res) => {
    const { phoneNo, password } = req.body;
    console.log(req.body)
    try {
        const user = await User.login(phoneNo, password);
        if (user) {
            const token = createToken(user._id);
            res.status(200).json({ token, "user": user.name, "type": user.type, "id": user._id, "email": user.email, "phone": user.phoneNo, "address": user.address, "profile": user.profile })
        }
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const signupUser = async (req, res) => {
    try {
        const { name, password, phoneNo, email, address } = req.body;
        const user = await User.signup(name, password, phoneNo, email, address, req.files);
        let token;
        if (user) token = createToken(user._id);
        if (token) res.status(200).json({ token, "user": user.name, "type": user.type, "id": user._id })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const forgotPassword = async (req, res) => {
    const { phoneNo, password } = req.body;
    try {
        const result = await User.forgotPassword(phoneNo, password);
        res.status(200).json({ message: result });
    }
    catch (error) {
        console.log(error.message)
        res.status(400).json({ error: error.message })
    }
}

const getAll = async (req, res) => {
    try {
        // let query = {};
        // if (Object.keys(req.query).length !== 0) {

        //     // Check if req.query.search is present and not empty
        //     if (req.query.search) {
        //         query.name = { '$regex': req.query.search, '$options': 'i' };
        //     }
        // }
        // const users = await User.find(query).sort({ createdAt: -1 }).select('name email phoneNo createdAt'); ;
        const users = await User.aggregate([
            {
                $lookup: {
                    from: "orders", // Name of the collection to join
                    localField: "_id",
                    foreignField: "broker",
                    as: "orders"
                }
            },
            {
                $project: {
                    name: 1,
                    email: 1,
                    phoneNo: 1,
                    createdAt: 1,
                    totalDeals: { $size: "$orders" } // Calculate the total number of orders for each user
                }
            },
        ]).sort({ createdAt: 1 });
        res.status(200).json({ data: users })
    } catch (error) {
        res.status(400).json({ "error": error.message })
    }
}

const update = async (req, res) => {
    let profile = JSON.parse(req.body.profile)
    const { id } = req.params;
    let message = 'User is successfully updated!';
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ error: 'No such user' })
        }
        if (req.query.action !== 'Update User') {
            if (!validator.isStrongPassword(req.body.password)) {
                throw Error('Password is not strong enough');
            }
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(req.body.password, salt);
            req.body.password = hash;
            message = "Password is successfully changed! Please login with your new password"
        }
        let imageInfo = [];
        if (req.files !== undefined && req.files?.length > 0) {
            req.files.map((file) => {
                imageInfo.push({
                    path: file.path,
                    name: file.filename,
                    type: file.mimetype
                })
            });
        }
        else if (profile.length > 0) {
            imageInfo = JSON.parse(req.body.profile);
        }

        const user = await User.findOneAndUpdate({ _id: id }, {
            ...req.body,
            "profile": imageInfo
        }, { new: true });

        if (!user) {
            return res.status(404).json({ error: 'No such user' })
        }

        res.status(200).json({ data: { "user": user.name, "type": user.type, "id": user._id, "email": user.email, "phone": user.phoneNo, "address": user.address, "profile": imageInfo }, message })
    } catch (error) {
        res.status(400).json({ "error": error.message })
    }

}

const remove = async (req, res) => {
    const { id } = req.params;
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ error: 'No such user' })
        }
        const user = await User.findByIdAndDelete(id);
        if (!user) {
            return res.status(404).json({ error: 'No such user' })
        }
        res.status(200).json({ message: "User is successfully deleted" });
    } catch (error) {
        res.status(400).json({ "error": error.message })
    }
}

module.exports = { signupUser, loginUser, forgotPassword, getAll, update, remove }
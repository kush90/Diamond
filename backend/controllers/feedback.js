const Feedback = require('../models/feedback');
const mongoose = require('mongoose')
const Noti = require('../models/notification');
const socket = require('../middleware/socket');

const create = async (req, res) => {
    console.log(req)
    const { name, email,phone,message } = req.body;
    console.log(req.body)
    let emptyFields = []

    if (!name) {
        emptyFields.push('name')
    }
    if (!email) {
        emptyFields.push('email')
    }
    if (!phone) {
        emptyFields.push('phone')
    }
    if (!message) {
        emptyFields.push('message')
    }

    if (emptyFields.length > 0) {
        return res.status(400).json({ error: 'Please fill all the fields', emptyFields })
    }

    try {
      const feedback = await Feedback.create({name,email,phone,message });
        if (!feedback) {
            return res.status(404).json({ error: 'No such feedback' })
        }
        const noti = await Noti.create({ noti: '*** New Feedback', createdBy:null });
        socket.emitNewNoti(noti)
        res.status(200).json({ data: feedback, message: 'Your message has been successfully delivered. We will get back to you shortly by phone or mail.Thank you.' })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }

}
const update = async (req, res) => {
    const { id } = req.params;
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ error: 'No such feedback' })
        }

        const feedback = await Feedback.findOneAndUpdate({ _id: id }, {
            ...req.body
        }, { new: true });

        if (!feedback) {
            return res.status(404).json({ error: 'No such feedback' })
        }

        res.status(200).json({ data: feedback, message: 'Feedback is successfully updated.' })
    } catch (error) {
        res.status(400).json({ "error": error.message })
    }

}

const getAll = async (req, res) => {
    try {
        let query = {};
        if (Object.keys(req.query).length !== 0) {

            // Check if req.query.search is present and not empty
            if (req.query.search) {
                query.name = { '$regex': req.query.search, '$options': 'i' };
            }
        }
        const limit = parseInt(req.query.limit) || 10;
        const page = parseInt(req.query.page) || 1;
        const totalCount = await Feedback.countDocuments();
        const feedbacks = await Feedback.find(query).sort({ createdAt: -1 }).skip((page - 1) * limit)
            .limit(limit);
        res.status(200).json({ data: feedbacks, totalCount })
    } catch (error) {
        res.status(400).json({ "error": error.message })
    }

}

const get = async (req, res) => {
    const { id } = req.params;
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ error: 'No such feedback' })
        }
        const feedback = await Feedback.findById(id).populate();
        if (!feedback) {
            return res.status(404).json({ error: 'No such feedback' })
        }
        res.status(200).json({ data: feedback })
    } catch (error) {
        res.status(400).json({ "error": error.message })
    }
}

const remove = async (req, res) => {
    const { id } = req.params;
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ error: 'No such feedback' })
        }
        const feedback = await Feedback.findByIdAndDelete(id);
        if (!feedback) {
            return res.status(404).json({ error: 'No such feedback' })
        }
        res.status(200).json({ message: "Feedback is successfully deleted" });
    } catch (error) {
        res.status(400).json({ "error": error.message })
    }
}

module.exports = { create, update, getAll, get, remove };
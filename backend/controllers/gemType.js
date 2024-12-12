const gemType = require('../models/gemType');
const mongoose = require('mongoose')

const create = async (req, res) => {
    const { name } = req.body;
    let emptyFields = []

    if (!name) {
        emptyFields.push('name')
    }

    if (emptyFields.length > 0) {
        return res.status(400).json({ error: 'Please fill the gem type name', emptyFields })
    }

    try {
        const userId = req.user._id;
        const type = await gemType.create({ name, "createdBy": userId });
        if (!type) {
            return res.status(404).json({ error: 'No such gem type' })
        }
        res.status(200).json({ data: type, message: 'Gem type is successfully created.' })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }

}
const update = async (req, res) => {
    const { id } = req.params;
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ error: 'No such gem type' })
        }

        const type = await gemType.findOneAndUpdate({ _id: id }, {
            ...req.body
        }, { new: true });

        if (!type) {
            return res.status(404).json({ error: 'No such gem type' })
        }

        res.status(200).json({ data: type, message: 'Gem type is successfully updated.' })
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
        const totalCount = await gemType.countDocuments();
        const types = await gemType.find(query).sort({ createdAt: -1 }).skip((page - 1) * limit)
        .limit(limit);
        res.status(200).json({ data: types,totalCount })
    } catch (error) {
        res.status(400).json({ "error": error.message })
    }
}

const get = async (req, res) => {
    const { id } = req.params;
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ error: 'No such gem type' })
        }
        const type = await gemType.findById(id).populate();
        if (!type) {
            return res.status(404).json({ error: 'No such gem type' })
        }
        res.status(200).json({ data: type })
    } catch (error) {
        res.status(400).json({ "error": error.message })
    }
}

const remove = async (req, res) => {
    const { id } = req.params;
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ error: 'No such gem type' })
        }
        const type = await gemType.findByIdAndDelete(id);
        if (!type) {
            return res.status(404).json({ error: 'No such gem type' })
        }
        res.status(200).json({ message: "Gem type is successfully deleted" });
    } catch (error) {
        res.status(400).json({ "error": error.message })
    }
}

module.exports = { create, update, getAll, get, remove };
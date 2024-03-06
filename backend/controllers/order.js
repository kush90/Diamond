const Order = require('../models/order');
const Product = require('../models/product');
const mongoose = require('mongoose')

const create = async (req, res) => {
    const { product } = req.body;
    const prefix = "ORD0000";
    const totalOrders = await Order.countDocuments();
    let index = 1;
    let referenceNo = '';
    if (totalOrders == 0) {
        referenceNo = prefix + index;
    }
    else {
        const latestRecord = await Order.findOne({}, {}, { sort: { 'createdAt': -1 } }).lean();
        index += latestRecord.index;
        referenceNo = prefix + index;

    }
    let emptyFields = []

    if (!product) {
        emptyFields.push('product')
    }

    if (emptyFields.length > 0) {
        return res.status(400).json({ error: 'Please fill all fields', emptyFields })
    }

    try {
        const userId = req.user._id;

        const order = await Order.create({ product, referenceNo, index, "broker": userId });
        if (order) await Product.findOneAndUpdate({ _id: product }, { status: 'pending' });
        res.status(200).json({ data: order, message: 'Order is successfully created.' })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }

}
const update = async (req, res) => {
    const { id } = req.params;
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ error: 'No such order' })
        }
        let imageInfo = {};
        if (req.body?.images) {
            imageInfo = JSON.parse(req.body.receipt);
        }
        if (req.files !== undefined && req.files?.length > 0) {
            req.files.map((file) => {
                imageInfo = {
                    path: file.path,
                    name: file.filename,
                    type: file.mimetype
                }
            });
        }

        const order = await Order.findOneAndUpdate({ _id: id }, {
            ...req.body, "receipt": imageInfo
        }, { new: true });
        if (req.files !== undefined && req.files?.length > 0 && order) {
            await Product.findOneAndUpdate({ _id: order.product }, { status: 'sold' })
        }

        if (!order) {
            return res.status(404).json({ error: 'No such order' })
        }

        res.status(200).json({ data: order, message: 'Order is successfully updated.' })
    } catch (error) {
        res.status(400).json({ "error": error.message })
    }

}

const getAll = async (req, res) => {
    try {
        const userId = req.user._id;
        let query = { broker: userId };
        if (Object.keys(req.query).length !== 0) {

            // Check if req.query.referenceNo is present and not empty
            if (req.query.referenceNo) {
                query.referenceNo = { '$regex': req.query.referenceNo, '$options': 'i' };
            }
        }
        const orders = await Order.find(query).populate('broker').populate('product').sort({ createdAt: -1 });
        res.status(200).json({ data: orders })
    } catch (error) {
        res.status(400).json({ "error": error.message })
    }
}

const getAllForAdmin = async (req, res) => {
    try {
        let query = {};
        if (Object.keys(req.query).length !== 0) {

            // Check if req.query.referenceNo is present and not empty
            if (req.query.referenceNo) {
                query.referenceNo = { '$regex': req.query.referenceNo, '$options': 'i' };
            }
        }
        const orders = await Order.find(query).populate('broker').populate('product').sort({ createdAt: -1 });
        res.status(200).json({ data: orders })
    } catch (error) {
        res.status(400).json({ "error": error.message })
    }
}

const get = async (req, res) => {
    const { id } = req.params;
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ error: 'No such order' })
        }
        const order = await Order.findById(id).populate();
        if (!order) {
            return res.status(404).json({ error: 'No such order' })
        }
        res.status(200).json({ data: order })
    } catch (error) {
        res.status(400).json({ "error": error.message })
    }
}

const remove = async (req, res) => {
    const { id } = req.params;
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ error: 'No such order' })
        }
        const order = await Order.findByIdAndDelete(id);
        if (!order) {
            return res.status(404).json({ error: 'No such order' })
        }
        res.status(200).json({ message: "Order is successfully deleted" });
    } catch (error) {
        res.status(400).json({ "error": error.message })
    }
}

const chart = async (req, res) => {
    try {
        let query = {};
        if (Object.keys(req.query).length !== 0) {
            if (req.query.month) {
                let month = (+req.query.month + 1);
                query.$expr = {
                    $eq: [
                        { $month: '$createdAt' },
                        month
                    ]
                };
            }
        }
        else {
            const today = new Date();
            const startOfWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay());
            const endOfWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay() + 6, 23, 59, 59, 999);
            query = {
                createdAt: {
                    $gte: startOfWeek,
                    $lt: endOfWeek
                }
            }
        }

        const orders = await Order.find(query);
        res.status(200).json({ data: orders })
    } catch (error) {
        res.status(400).json({ "error": error.message })
    }
}

module.exports = { create, update, getAll, get, remove, chart, getAllForAdmin };
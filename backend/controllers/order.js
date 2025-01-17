const mongoose = require('mongoose')
const Order = require('../models/order');
const Product = require('../models/product');
const Noti = require('../models/notification');
const socket = require('../middleware/socket');

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
        const newOrder = await order.populate(['broker', 'product']);
        if (req.body?.type == 'book') {
            const noti = await Noti.create({ sender: newOrder.broker.name, noti: 'is secured the deal of the product Number of', item: newOrder.product.productNumber, createdBy: newOrder.product.createdBy });
            socket.emitNewNoti(noti)
        }
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
        console.log(req.body);
        const order = await Order.findOneAndUpdate({ _id: id }, {
            ...req.body, "receipt": imageInfo
        }, { new: true });
        const newOrder = await order.populate(['broker', 'product']);
        console.log(newOrder)
        if (req.body.status === 'toDeliver') {
            const noti = await Noti.create({ sender: newOrder.broker.name, noti: `has confrimed the order under reference no '${newOrder.referenceNo}' and provided the delivery address of the buyer`, createdBy: newOrder.product.createdBy });
            socket.emitNewNoti(noti)
        }
        else if (req.body.status === 'delivered') {
            const noti = await Noti.create({ noti: `The order reference '${newOrder.referenceNo}' has been develivered to the buyer`, createdBy: newOrder.broker._id });
            socket.emitNewNoti(noti)
        }
        else if (req.body.status === 'doneDeal') {
            const noti = await Noti.create({ noti: `The order reference '${newOrder.referenceNo}' has processed a payment of 10% commission to the broker`, createdBy: newOrder.broker._id });
            socket.emitNewNoti(noti)
        }
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

// const getAll = async (req, res) => {
//     let queryValue = req.query;
//     try {
//         const userId = req.user._id;
//         let query;
//         if(!req.query || Object.keys(req.query).length === 0) query = { broker: userId };
//         else query = queryValue;
//         if (Object.keys(req.query).length !== 0) {

//             // Check if req.query.referenceNo is present and not empty
//             if (req.query.referenceNo) {
//                 query.referenceNo = { '$regex': req.query.referenceNo, '$options': 'i' };
//             }
//         }
//         const limit = parseInt(req.query.limit) || 10;
//         const page = parseInt(req.query.page) || 1;
//         const totalCount = await Product.countDocuments();
//         const orders = await Order.find(query).populate('broker').populate('product').sort({ createdAt: -1 }).skip((page - 1) * limit)
//         .limit(limit);
//         res.status(200).json({ data: orders,totalCount })
//     } catch (error) {
//         res.status(400).json({ "error": error.message })
//     }
// }
const getAll = async (req, res) => {
    try {
        const userId = req.user._id; // Get user ID from request, assuming `req.user` contains the authenticated user data.
        // Default query to filter by broker (userId)
        let query = { broker: userId };

        // Check if `referenceNo` is in the query and apply regex if present
        if (req.query.referenceNo) {
            query.referenceNo = { '$regex': req.query.referenceNo, '$options': 'i' };
        }

        // Pagination: use limit and page from the query, or default to 10 and 1 if not provided
        const limit = parseInt(req.query.limit) || 10;
        const page = parseInt(req.query.page) || 1;

        // Total count of orders matching the query (to calculate the total number of pages)
        const totalCount = await Order.countDocuments(query); // Ensure you apply the filter to the count query too
        
        // Fetch the orders based on the query, sorted, and paginated
        const orders = await Order.find(query)
            .populate('broker') // Assuming `broker` is a reference in the `Order` model
            .populate('product') // Assuming `product` is a reference in the `Order` model
            .sort({ createdAt: -1 }) // Sort by most recent orders first
            .skip((page - 1) * limit) // Skip the appropriate number of orders based on the page number
            .limit(limit); // Limit the number of orders based on the limit
        
        // Return the orders with total count for pagination metadata
        res.status(200).json({ data: orders, totalCount });
    } catch (error) {
        res.status(400).json({ "error": error.message });
    }
};

const getAllForAdmin = async (req, res) => {
    try {
        let query = {};
        if (Object.keys(req.query).length !== 0) {

            // Check if req.query.referenceNo is present and not empty
            if (req.query.referenceNo) {
                query.referenceNo = { '$regex': req.query.referenceNo, '$options': 'i' };
            }
        }
        const limit = parseInt(req.query.limit) || 10;
        const page = parseInt(req.query.page) || 1;
        const totalCount = await Order.countDocuments();
        const orders = await Order.find(query).populate('broker').populate('product').sort({ createdAt: -1 }).skip((page - 1) * limit)
        .limit(limit);
        res.status(200).json({ data: orders,totalCount })
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
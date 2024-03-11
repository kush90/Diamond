const Product = require('../models/product');
const mongoose = require('mongoose');
const { deleteImage } = require('../middleware/fileUpload');
const Noti = require('../models/notification');
const socket = require('../middleware/socket');

const create = async (req, res) => {
    const { name, productNumber, description, shortDescription, price, categoryId } = req.body;
    // const prefix = "BAC";
    // const totalProducts = await Product.countDocuments();
    // let index = 1;
    // let productNumber = '';
    // if (totalProducts == 0) {
    //     productNumber = prefix + index;
    // }
    // else {
    //     const latestRecord = await Product.findOne({}, {}, { sort: { 'createdAt': -1 } }).lean();
    //     index += latestRecord.index;
    //     productNumber = prefix + index;

    // }
    let emptyFields = []

    if (!name) {
        emptyFields.push('name')
    }
    if (!productNumber) {
        emptyFields.push('productNumber')
    }
    if (!shortDescription) {
        emptyFields.push('shortDescription')
    }
    if (!description) {
        emptyFields.push('description')
    }
    if (!price) {
        emptyFields.push('price')
    }
    if (emptyFields.length > 0) {
        return res.status(400).json({ error: 'Please fill in all the fields', emptyFields })
    }
    try {
        const imageInfo = await req.files?.files?.map((file) => {
            return {
                path: file.path,
                name: file.filename,
                type: file.mimetype
            }
        });
        const certificate = await req.files?.certificate.map((file) => {
            return {
                path: file.path,
                name: file.filename,
                type: file.mimetype
            }
        });
        const createdBy = req.user._id;
        const product = await Product.create({ productNumber, name, description, shortDescription, categoryId, price, createdBy, "images": imageInfo, certificate });
        const noti = await Noti.create({ noti: 'New product is available now!', createdBy:null });
        socket.emitNewNoti(noti)
        const newProduct = await product.populate('categoryId');
        res.status(200).json({ data: newProduct, message: 'Product is successfully created.' })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }

}
const update = async (req, res) => {
    const { id } = req.params;
    try {
        let imageInfo = [];
        if (req.body?.images) {
            imageInfo = JSON.parse(req.body.images);
        }
        if (req.files.files !== undefined && req.files.files.length > 0) {
            req.files.files.map((file) => {
                imageInfo.push({
                    path: file.path,
                    name: file.filename,
                    type: file.mimetype
                })
            });
        }
        let certificate = {};
        if (req.body?.certificate) {
            certificate = JSON.parse(req.body.certificate);
        }
        if (req.files.certificate !== undefined && req.files.certificate?.length > 0) {
            req.files.certificate.map((file) => {
                certificate.push({
                    path: file.path,
                    name: file.filename,
                    type: file.mimetype
                })
            });
        }
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ error: 'No such product' })
        }
        const existingDocument = await Product.findOne({ _id: id }).lean();
        if (!existingDocument) {
            // Handle the case when the document is not found
            return res.status(404).json({ error: 'No such product' })
        }
        const product = await Product.findOneAndUpdate({ _id: id }, {
            ...req.body, "images": imageInfo, certificate
        }, { new: true }).populate('categoryId');;
        res.status(200).json({ data: product, message: 'Product is successfully updated.' })
    } catch (error) {
        res.status(400).json({ "error": error.message })
    }

}

const getAll = async (req, res) => {
    try {
        let query = { status: 'active' };
        if (Object.keys(req.query).length !== 0) {

            // Check if req.query.name is present and not empty
            if (req.query.name) {
                query.name = { '$regex': req.query.name, '$options': 'ix' };
            }
            if (req.query.categoryId) {
                if (!mongoose.Types.ObjectId.isValid(req.query.categoryId)) {
                    return res.status(404).json({ error: 'No such category' })
                }
                query.categoryId = req.query.categoryId;
            }
        }
        const products = await Product.find(query).populate('categoryId').sort({ createdAt: -1 });
        res.status(200).json({ data: products })
    } catch (error) {
        res.status(400).json({ "error": error.message })
    }
}

const getAllForAdmin = async (req, res) => {
    try {
        let query = {};
        if (Object.keys(req.query).length !== 0) {

            // Check if req.query.name is present and not empty
            if (req.query.name) {
                query.name = { '$regex': req.query.name, '$options': 'ix' };
            }
            if (req.query.categoryId) {
                if (!mongoose.Types.ObjectId.isValid(req.query.categoryId)) {
                    return res.status(404).json({ error: 'No such category' })
                }
                query.categoryId = req.query.categoryId;
            }
        }
        const products = await Product.find(query).populate('categoryId').sort({ createdAt: -1 });
        res.status(200).json({ data: products })
    } catch (error) {
        res.status(400).json({ "error": error.message })
    }
}

const get = async (req, res) => {
    const { id } = req.params;
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ error: 'No such product' })
        }
        let product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ error: 'No such product' })
        }
        res.status(200).json({ data: product })
    } catch (error) {
        res.status(400).json({ "error": error.message })
    }
}

const remove = async (req, res) => {
    const { id } = req.params;
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ error: 'No such product' })
        }
        const product = await Product.findByIdAndDelete(id);
        if (!product) {
            return res.status(404).json({ error: 'No such product' })
        }
        product.images.map((img) => {
            deleteImage(img.path) // delete images under upload folder as well
        });
        res.status(200).json({ message: "Product is successfully deleted" });

    } catch (error) {
        res.status(400).json({ "error": error.message })
    }
}
module.exports = { create, update, getAll, get, remove, getAllForAdmin };
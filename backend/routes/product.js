const express = require('express');
const {upload} = require('../middleware/fileUpload');
const { create,update,getAll,get,remove, getAllForAdmin} = require('../controllers/product');
const auth = require('../middleware/auth')

const product = express.Router();
product.use(auth);
product.post('/create',upload.fields([{ name: 'files' }, { name: 'certificate' }]),create);
product.patch('/update/:id', upload.fields([{ name: 'files' }, { name: 'certificate' }]), update)
product.get('/getAll/',getAll);
product.get('/getAll/admin',getAllForAdmin);
product.get('/get/:id',get);
product.delete('/delete/:id',remove);
module.exports = product;
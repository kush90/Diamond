const express = require('express');
const {upload} = require('../middleware/fileUpload');
const { create,update,getAll,get,remove,chart,getAllForAdmin} = require('../controllers/order');
const auth = require('../middleware/auth')

const order = express.Router();
order.use(auth);
order.post('/create',create);
order.patch('/update/:id', upload.array('files'), update)
order.get('/getAll/',getAll);
order.get('/getAll/admin',getAllForAdmin);
order.get('/get/:id',get);
order.delete('/delete/:id',remove);
order.get('/chart',chart);

module.exports = order;
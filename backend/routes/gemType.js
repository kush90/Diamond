const express = require('express');
const { create,update,getAll,get,remove } = require('../controllers/gemType');
const auth = require('../middleware/auth')

const gemType = express.Router();
gemType.use(auth);
gemType.post('/create',create);
gemType.patch('/update/:id', update)
gemType.get('/getAll/',getAll);
gemType.get('/get/:id',get);
gemType.delete('/delete/:id',remove);
module.exports = gemType;
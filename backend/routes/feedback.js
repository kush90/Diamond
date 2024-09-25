const express = require('express');
const { create,update,getAll,get,remove } = require('../controllers/feedback');
const auth = require('../middleware/auth')

const feedback = express.Router();
// feedback.use();
feedback.post('/create',create);
feedback.patch('/update/:id',auth, update);
feedback.get('/getAll/',auth,getAll);
feedback.get('/get/:id',auth,get);
feedback.delete('/delete/:id',auth,remove);
module.exports = feedback;
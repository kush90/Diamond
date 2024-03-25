const express = require('express');
const { getAll, update } = require('../controllers/notification');
const auth = require('../middleware/auth')

const notification = express.Router();
notification.use(auth);
notification.get('/getAll/',getAll);
notification.post('/update/',update);
module.exports = notification;
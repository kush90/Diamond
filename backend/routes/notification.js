const express = require('express');
const { getAll } = require('../controllers/notification');
const auth = require('../middleware/auth')

const notification = express.Router();
notification.use(auth);
notification.get('/getAll/',getAll);
module.exports = notification;
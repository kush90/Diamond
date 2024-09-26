const express = require('express');
const {upload} = require('../middleware/fileUpload');
const { loginUser, signupUser,forgotPassword,getAll, update,remove } = require('../controllers/user');
const user = express.Router();
user.post('/login',loginUser);
user.post('/signup',upload.array('files'),signupUser);
user.post('/forgot',forgotPassword);
user.get('/getAll',getAll);
user.patch('/update/:id',upload.array('files'),update);
user.delete('/delete/:id',remove);



module.exports = user;
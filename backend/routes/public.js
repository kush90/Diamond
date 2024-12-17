const express = require('express');
const { getByProductNumber } = require('../controllers/product');

const public = express.Router();

public.get('/product/:productNumber',getByProductNumber);
module.exports = public;
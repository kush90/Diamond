require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors');
const bodyParser = require('body-parser')

const userRoutes = require('./routes/user')
const productRoutes = require('./routes/product')
const orderRoutes = require('./routes/order')
const categoryRoutes = require('./routes/category')
const gemTypeRoutes = require('./routes/gemType')
const notificationRoutes = require('./routes/notification')
const feedbackRoutes = require('./routes/feedback')
const publicRoutes = require('./routes/public');

const io = require('./middleware/socket');
// express app
const app = express();

// middleware
app.use(express.json())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads')); // to give access to render images to frontend
app.use('/test/welcome', (req, res) => {
  res.status(200).json({ message: "hi" })
});

// routes
app.use('/api/user', userRoutes);
app.use('/api/product', productRoutes);
app.use('/api/order', orderRoutes)
app.use('/api/category', categoryRoutes);
app.use('/api/gemType', gemTypeRoutes);
app.use('/api/notification',notificationRoutes);
app.use('/api/feedback',feedbackRoutes)
app.use('/api/public',publicRoutes)

let server = app.listen(process.env.PORT, () => {
  console.log('connected to db & listening on port', process.env.PORT)
});
io.initSocket(server);

// connect db
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('connected to db')
  })
  .catch((error) => {
    console.log(error)
  })
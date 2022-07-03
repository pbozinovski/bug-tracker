const express = require('express')
const userRoutes = require('./routes/userRoutes')
const authRoutes = require('./routes/authRoutes')
require('dotenv').config()
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const app = express();


const corsConfig = {
    origin: true,
    credentials: true,
  };

app.use(cors(corsConfig))
app.use(cookieParser())
app.use(express.json())


app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);


// error handler middleware
app.use((err, req, res, next) => {
    const errStatus = err.status || 500;
    const errMsg = err.message || 'Something went wrong';
    return res.status(errStatus).json({
        success: false,
        status: errStatus,
        message: errMsg,
    });
})

app.listen(process.env.PORT || 5000, console.log("listening to port 5000"));

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("connected to DB ")
    }).catch(err => {
        console.log(err)
    });


const mongoose = require('mongoose')
const dotenv = require('dotenv').config()

const connectDB = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGO_URI)
        console.log(`MongoDB connected: ${connection.connection.host}`)
    } catch (error) {
        console.log(error);
        process.exit();
    }
}

module.exports = connectDB;
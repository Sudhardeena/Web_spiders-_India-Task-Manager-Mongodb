const mongoose = require('mongoose')
require('dotenv').config()

const MONGO_URL = process.env.MONGO_URL
const DB_NAME = process.env.DB_NAME


const connectDB = () => mongoose.connect(MONGO_URL, {
    dbName: DB_NAME
})

module.exports = connectDB
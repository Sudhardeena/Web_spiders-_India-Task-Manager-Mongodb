const express = require('express')
const cors = require('cors')
const userRoutes = require('./routes/userRoutes.js')
const taskRoutes = require('./routes/taskRoutes.js')
const {errorHandler} = require('./middlewares/errorHandler.js')

const app = express()

require('dotenv').config()
const PORT = process.env.PORT;
const connectDB = require('./db')


app.use(cors())
app.use(express.json())

app.get('/', (req,res)=> {
    res.json({
        message: 'Task manager API is working'
    })
})

//connect to mongodb database before lisenting to requests
connectDB().then(()=>{
    console.log('Connected to database')

    app.use('/users', userRoutes);
    app.use('/tasks', taskRoutes)

    app.use(errorHandler)

    app.listen(PORT, ()=>{
        console.log(`Server is running on port ${PORT}`)
    })
}).catch((err)=>{
    console.log(`Error connect to database: ${err}`)
})
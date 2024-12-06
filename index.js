const express = require('express')
const cors = require('cors')

const app = express()

require('dotenv').config()
const PORT = process.env.PORT;
require('./db')


app.use(cors())
app.use(express.json())

app.get('/', (req,res)=> {
    res.json({
        message: 'Task manager API is working'
    })
})

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)
})
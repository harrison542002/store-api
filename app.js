require('dotenv').config()

//Error handler package
require('express-async-errors')
const express = require('express')
const app = express()

//middleware for building connection with Mongo DB
const connectDB = require('./db/connect')

//middleware for handlering not Found Pages
const notFoundMiddleWare = require('./middleware/not-found')

//middleware for user's error handler
const errorHandler = require('./middleware/error-handler')

//middleware for routes and controllers
const route = require('./routes/products')

//middleware for parsing json data
app.use(express.json())


//routes
app.get('/',(req,res)=>{
    res.send('<h1>Store API</h1><a href="/api/v1/products">products route</a>')
})

//product routes
app.use('/api/v1/products',route)

app.use(errorHandler)
app.use(notFoundMiddleWare)

const port = process.env.PORT || 3000

//Handle connection database before listening to port
const starter = async ()=>{
    try {
        //connnect db
        await connectDB(process.env.MONGO_URI)
        app.listen(port, console.log(`Server is listening to port : ${port}...`))
    } catch (error) {
        console.log(error)
    }
}

starter()
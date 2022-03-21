const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, 'product must be provided.']
    },
    price:{
        type: Number,
        required: [true, 'price must be provided.']
    },
    featured:{
        type: Boolean,
        default: false
    },
    createdAt:{
        type: Date,
        default: Date.now()
    },
    company:{
        type:String,
        enum:{
            values: ['ikea','liddy','caressa','marcos'],
            message: '{VALUES} is not supported.'
        }
    },
    rating:{
        type:Number,
        default: 4.5
    }
})

const product = mongoose.model('Products', productSchema)

module.exports =  product
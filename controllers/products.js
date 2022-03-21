const Product = require('../models/product')
const getAllProducts = async (req, res) => {

    //obtain specific data
    const { featured, company, name, sort, fields, numericFilters } = req.query
    const queryObject = {}
    if (featured) {
        queryObject.featured = featured === "true" ? true : false;
    }
    if (company) {
        queryObject.company = company;
    }
    if (name) {
        queryObject.name = { $regex: name, $options: 'i' }
    }
    if(numericFilters){
        const OperatorMap = {
            '>':'$gt',
            '>=':'$gte',
            '=':'$eq',
            '<':'$lt',
            '<=':'$lte'
        }
        const regex = /\b(<|>|<=|>=|=)\b/g
        let filters = numericFilters.replace(regex,(match)=> `-${OperatorMap[match]}-`)

        //set options for clients
        const options = ['price', 'rating']

        
        filters = filters.split(',').forEach((item)=>{
            const [field, operator, values] = item.split('-')
            if(options.includes(field)){
                queryObject[field] = { [operator] : Number(values)}
            }
        })
    }
    let result = Product.find(queryObject)

    //sort data by query which user entered
    if (sort) {
        const sortList = sort.split(',').join(' ')
        result = result.sort(sortList)
    }
    else {
        result = result.sort('createdAt')
    }

    //to filter out items
    if(fields){
        const fieldsList = fields.split(',').join(' ')
        result = result.select(fieldsList)
    }
    const page = Number(req.query.page) || 1 // Set the page number
    const limit = Number(req.query.limit) || 10 // Set the limitation
    const skip = (page - 1) * limit // In order to get the page number

    //23
    //page(3) limit 1(10) 2(10) 3(3)
 
    result = result.skip(skip).limit(limit)
    const products = await result
    res.status(200).json({ products, nbHints: products.length })
}

const getAllProductsStatic = async (req, res) => {
    const products = await Product.find({}).sort('name price')
    res.status(200).json({ products, nbHints: products.length })
}

module.exports = { getAllProducts, getAllProductsStatic }
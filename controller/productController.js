const Product = require('../models/productModel');
const apiFeatures = require('../utils/apiFeatures');




//create product
exports.createProduct=async(req, res)=>{
    const product  = await Product.create(req.body);
    res.status(200).json({
        success:true,
        product
    });
}

//get all product
exports.getAllProducts=async(req, res)=>{
    const resultPerPage = 5;
    const productCount = await Product.countDocuments()
    const apiFeature = new apiFeatures(Product.find(),req.query)
        .search()
        .filter()
        .pagination(resultPerPage);
    const product = await apiFeature.query;
    res.status(200).json({
        success:true,
        product
    });
}

//update product--admin
exports.updateProduct=async(req, res)=>{
    const product = await Product.findByIdAndUpdate(req.params.id,req.body,{new:true});
    if(!product){
        res.status(400).json('product not found');
    }
    res.status(200).json({
        success:true,
        product
    });
}

//delete product--admin
exports.deleteProduct=async(req, res)=>{
    const product = await Product.findByIdAndDelete(req.params.id);
    if(!product){
        res.status(400).json({
            success:true,
            message:"Product delete successfully"
        });
    }
}

//get product details
exports.getProductDetails=async(req, res)=>{
    const product = await Product.findById(req.params.id);
    if(!product){
        res.status(400).json('product not found');
    }
    res.status(200).json({
        success:true,
        product,
        productCount
    });
}
const asyncHandler = require("express-async-handler");

const Product = require("../models/productModel");
const User = require("../models/userModel");

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({});
    res.json(products);
});

// @desc Fetch User Products
// @route GET /api/products/
// @access Private
const getUserProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({ user: req.user._id });
    res.json(products);
});
    
// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if(product) {
        res.json(product)
    }else {
        res.status(404)
        throw new Error("Product not found")
    }
}
);

// @desc    Delete a product of a user
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)
    if (!product) {
        res.status(404)
        throw new Error("Product not found")
    }

    if (!req.user._id.equals(product.user)) {
        res.status(401)
        throw new Error("Not authorized")
    }
    else {
        await product.deleteOne()
        res.json({ message: "Product removed"})
    }
}
);

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = asyncHandler(async (req, res) => {
    const { name, price, image, description, quantity, brand } = req.body
    const product = new Product({
        name,
        price,
        user: req.user._id,
        image,
        description,
        quantity,
        brand
    })
    const createdProduct = await product.save()
    res.status(201).json(createdProduct)
}
);

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
    const { name, price, image, description, quantity } = req.body
    const product = await Product.findById(req.params.id);
    console.log(product)
    if (!product) {
        res.status(404)
        throw new Error("Product not found")
    }
    if(!req.user._id.equals(product.user)) {
        res.status(401)
        throw new Error("Not authorized")
    }
    else {
        product.name = name
        product.price = price
        product.image = image
        product.description = description
        product.quantity = quantity

        const updatedProduct = await product.save()
        res.json(updatedProduct)
    }

}
);




module.exports = {
    getProducts,
    getUserProducts,
    getProductById,
    deleteProduct,
    createProduct,
    updateProduct,
}
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const Product = require('../models/productModel')

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
    const { userType, name, email, password } = req.body
    console.log(req.body)
    if(!userType || !name || !email || !password) {
        res.status(400)
        throw new Error("Please add all the fields")
    }

    const userExists = await User.findOne({ email })
    if (userExists) {
        res.status(400)
        throw new Error("User already exists");
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const user = await User.create({
        userType,
        name,
        email,
        password: hashedPassword
    })

    if (user) {
        res.status(201).json({
            _id: user._id,
            userType: user.userType,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    }else {
        res.status(400)
        throw new Error('Invalid user data')
    }
})

// @desc    Login a user
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    if(!email || !password) {
        res.status(400).json({ message: "Please fill in all fields" })
    }

    const user = await User.findOne({ email })
    if (user && (await bcrypt.compare(password, user.password))) {
        res.status(200).json({
            _id: user._id,
            userType: user.userType,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    }else {
        res.status(401).json({ message: "Invalid email or password" })
    }
})

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
    const { _id, userType, name, email } = await User.findById(req.user.id)
    res.status(200).json({
        _id,
        name,
        userType,
        email
    })
})

// @desc   Add a product to cart
// @route  POST /api/users/cart
// @access Private
const addToCart = asyncHandler(async (req, res) => {
    const { productId } = req.body
    const product = Product.findById(productId)
    if (!product) {
        res.status(404)
        throw new Error("Product not found")
    }


    req.user.carts.push({
        productId: productId,
        quantity: 1,
    });

     await req.user.save();
     console.log(req.user.carts)
     res.status(200).json({ message: "Product added to cart" });
    
})

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "30d"
    })
}

module.exports = {
    registerUser,
    loginUser,
    getUserProfile,
    addToCart
}
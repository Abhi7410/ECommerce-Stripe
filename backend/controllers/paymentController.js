const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Product = require("../models/productModel");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);


const isProductExists = async (productId) => {
    const product = await Product.findById(productId);
    if (product) {
        return true;
    } else {
        return false;
    }
}
    
const isUserExists = async (userId) => {
    const user = await User.findById(userId);
    if (user) {
        return true;
    }
    else {
        return false;
    }
}

const checkoutProduct = asyncHandler(async (req, res) => {
    const productId = req.body.productId;
    const userId = req.user._id.toString();
    const user = await User.findById(userId);
    if (!user) {
        res.status(404)
        throw new Error("User not found")
    }
    const productDataInUserCart = user.carts.find((item) => item.productId.toString() == productId.toString());
    if (!productDataInUserCart) {
        res.status(404)
        throw new Error("Product not found in cart")
    }
    
    const product = await Product.findById(productId);

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
            {
                price_data: {
                    currency: 'inr',
                    product_data: {
                        name: product.name,
                    },
                    unit_amount: product.price*100,
                },
                quantity: productDataInUserCart.quantity,
            },
        ],
        mode: 'payment',
        success_url: 'http://localhost:3000/success',
        cancel_url: 'http://localhost:3000/cancel',
    });
    console.log("Checkout Session ID:", session.id);

    return res.send({ success: true, checkoutURL: session.url , sessionId : session.id});
});


module.exports = { checkoutProduct };
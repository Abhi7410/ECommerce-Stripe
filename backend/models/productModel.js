const mongoose = require('mongoose')

const ProductSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    name: {
        type: String,
        required: [true, "Please add a name"],
    },
    image: {
        type: String,
        required: [true, "Please add an image"],
    },
    brand: {
        type: String,
    },
    category: {
        type: String,
    },
    description: {
        type: String,
        required: [true, "Please add a description"],
    },
    quantity: {
        type: Number,
        required: [true, "Please add quantity"],
    },
    price: {
        type: Number, 
        required: [true, "Please add price"],
    },
    reviews: [
        {
            name: {
                type: String,
                required: true
            },
            rating: {
                type: Number,
                required: true
            },
            comment: {
                type: String,
                required: true
            }
        }
    ],
}, {
    timestamps: true
})
    
module.exports = mongoose.model("Product", ProductSchema)
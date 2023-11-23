const express = require('express')
const router = express.Router()
const { protect } = require('../middleware/authMiddleware')
const { registerUser, loginUser, getUserProfile, addToCart, getCartItems, updateCartItems } = require('../controllers/userController')

router.post('/', registerUser);
router.post('/login', loginUser);
router.get('/profile', protect,getUserProfile);
router.post('/cart', protect, addToCart);
router.get('/cart',protect,getCartItems)
router.put('/cart',protect,updateCartItems)

module.exports = router 
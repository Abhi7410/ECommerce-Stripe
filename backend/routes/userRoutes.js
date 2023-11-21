const express = require('express')
const router = express.Router()
const { protect } = require('../middleware/authMiddleware')
const { registerUser, loginUser, getUserProfile, addToCart } = require('../controllers/userController')

router.post('/', registerUser);
router.post('/login', loginUser);
router.get('/profile', getUserProfile);
router.post('/cart',protect,addToCart);


module.exports = router 
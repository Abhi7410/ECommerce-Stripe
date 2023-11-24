const express = require('express')
const router = express.Router()
const { protect } = require('../middleware/authMiddleware')

const { checkoutProduct } = require('../controllers/paymentController')

router.route('/checkout').post(protect,checkoutProduct)

module.exports = router;
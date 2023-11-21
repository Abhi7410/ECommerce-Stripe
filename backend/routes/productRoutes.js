const express = require('express')
const router = express.Router();

const { getProducts, getUserProducts,getProductById, deleteProduct, createProduct, updateProduct } = require('../controllers/productController')
const { protect} = require('../middleware/authMiddleware')

router.route('/').get(getProducts).post(protect,createProduct).get(protect,getUserProducts)
router.route('/:id').get(getProductById).delete(protect, deleteProduct).put(protect, updateProduct)

module.exports = router
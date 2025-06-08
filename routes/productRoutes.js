const express = require('express');
const router = express.Router();

// import the authentication auth.js
const auth = require('../middleware/auth');

//import the validation middleware
const { validateProduct, validateRequest } = require('../middleware/validator');

// Import product controller
const {
    getProducts,
    getProductByID,
    updateProductPrice,
    createProduct,
    updateProduct,
    deleteProduct,
    getProductStats,
} = require('../controller/productController');

// Define routes for product operations
router.route('/')
    .get(getProducts)          // Get all products
    .post(auth, validateProduct, validateRequest, createProduct);      // Create a new product

router.route('/stats')
    .get(getProductStats); // Get product statistics

router.route('/:id')
    .get(getProductByID)      // Get a product by ID
    .put(auth, validateProduct, validateRequest, updateProduct)        // Update a product by ID
    .patch(auth, validateProduct, validateRequest, updateProductPrice) // Update product price by ID
    .delete(auth, deleteProduct);    // Delete a product by ID

// Export the router
module.exports = router;
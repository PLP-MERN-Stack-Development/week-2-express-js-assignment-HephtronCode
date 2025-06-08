    const Product = require('../models/product');
    const asyncHandler = require('../utils/asyncHandler');
    const { NotFoundError, BadRequestError } = require('../utils/customErrors');
        
    // Get all product
    const getProducts = asyncHandler(async (req, res) => {
        // 1. FILTER AND SEARCHING
        const queryObj = {};

        // filtering by category
        if (req.query.category) { queryObj.category = req.query.category; }
        // searching by name
        if (req.query.name) { queryObj.name = { $regex: req.query.name, $options: 'i' }; }


        // 2. PAGINATION
        const page = parseInt(req.query.page) || 1; // Default to page 1
        const limit = parseInt(req.query.limit) || 10; // Default to 10 items per page
        const skip = (page - 1) * limit;
        // EXECUTE QUERY
        const products = await Product.find(queryObj).sort({createdAt: -1}).skip(skip).limit(limit);
        // 3. COUNT TOTAL PRODUCTS
        const totalProducts = await Product.countDocuments(queryObj);
        // SEND A RESPONSE
        res.json({
            status: 'success',
            results: products.length,
            totalProducts,
            currentPage: page,
            totalPages: Math.ceil(totalProducts / limit),
            data: products
        })

    });

// Get product by ID
const getProductByID = asyncHandler(async (req, res) => {
    const product = await Product.findOne({ id: req.params.id });
    if (!product) {
        return next(new NotFoundError(`Product not found with ID: ${req.params.id}`));
    }
    res.json(product);
});

// Create a new product
const createProduct = asyncHandler(async (req, res) => {
    const { name, description, price, category, inStock } = req.body;
    const newProduct = new Product({ name, description, price, category, inStock });
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
});

// Update a product
const updateProduct = asyncHandler(async (req, res) => {
    const updatedProduct = await Product.findOneAndUpdate(
        { id: req.params.id },
        req.body,
        { new: true, runValidators: true }
    );
    if (!updatedProduct) {
        return next(new NotFoundError(`Product not found with ID: ${req.params.id}`));
    }
    res.status(200).json(updatedProduct);
});

// Update product price
const updateProductPrice = asyncHandler(async (req, res) => {
    const { price } = req.body;
    if (typeof price !== 'number' || price < 0) {
        return next(new BadRequestError(`Invalid price value`));
    }
    const updatedProduct = await Product.findOneAndUpdate(
        { id: req.params.id },
        { price },
        { new: true, runValidators: true }
    );
    if (!updatedProduct) {
        return next(new NotFoundError(`Product not found with ID: ${req.params.id}`));
    }
    res.status(200).json(updatedProduct);
});


// Delete a product
const deleteProduct = asyncHandler(async (req, res) => {
    const deletedProduct = await Product.findOneAndDelete({ id: req.params.id });
    if (!deletedProduct) {
        return next(new NotFoundError(`Product not found with ID: ${req.params.id}`));
    }
    res.status(200).json({ message: `Product deleted successfully` });
});


// GET /api/products/stats - Get product statistics
const getProductStats = asyncHandler(async (req, res, next) => {
    const stats = await Product.aggregate([
      {
        // Stage 1: Group documents by the 'category' field
        $group: {
          _id: '$category', // The field to group by
          productCount: { $sum: 1 }, // Count the number of products in each group
          totalStock: { $sum: { $cond: ['$inStock', 1, 0] } }, // Count only items in stock
          avgPrice: { $avg: '$price' }, // Calculate the average price
          minPrice: { $min: '$price' }, // Find the minimum price
          maxPrice: { $max: '$price' }, // Find the maximum price
        }
      },
      {
        // Stage 2: Sort the results by the group ID (category name)
        $sort: { _id: 1 }
      }
    ]);
  
    res.json({
      status: 'success',
      data: {
        stats,
      },
    });
  });

// Export the controller functions
module.exports = {
    getProducts,
    getProductByID,
    updateProductPrice,
    createProduct,
    updateProduct,
    deleteProduct,
    getProductStats
};
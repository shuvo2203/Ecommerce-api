const express = require('express');
const { 
    getAllProducts, 
    createProduct, 
    updateProduct,
    deleteProduct,
    getProductDetails
} = require('../controller/productController');
const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth');
const router = express.Router();


router.route('/product/new').post(createProduct);
router.route('/products').get(isAuthenticatedUser,authorizeRoles("admin"), getAllProducts);
router.route('/product/:id')
                            .put(updateProduct)
                            .delete(deleteProduct)
                            .get(getProductDetails)


module.exports = router;
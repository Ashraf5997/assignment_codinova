

const express = require('express');
const router  = express.Router(); 
const auth    =     require('../middlewares/auth');
const usersController = require('../controllers/users.controller');
const productsController = require('../controllers/products.controller');
const extractTokenController = require('../controllers/extractToken.controller');
const cartController = require('../controllers/cart.controller');

//create  user 
router.post('/user',usersController.createUser);

//login  user 
router.post ('/login',usersController.loginUser);

// Extract token
router.post('/extract-token',extractTokenController.extractToken);

// REFRESH TOKEN
router.post('/refresh',extractTokenController.refreshToken);

// LOGOT 
router.post('/logout',usersController.logoutUser);

// Create Products
router.post('/product',productsController.createProducts);

// Update Products
router.put('/product/:id',productsController.updateProducts);

// Delete Products
router.delete('/product/:id',productsController.deleteProducts);

// Fetch Products
router.get('/product',productsController.fetchProducts);

// Fetch Products By Category
router.get('/product/:name',productsController.fetchByNameProducts);

// Post CART Products By Category
router.post('/cart/product',cartController.addCartProducts);

// DELETE CART Products By Category
router.delete('/cart/product/:id',cartController.deleteCartProducts);

// Fetch  Altt CART Products By name of owner
router.get('/cart/product/:name',cartController.getCartProducts);

// Fetch  quantity by name and Id
router.put('/cart/product',cartController.updateCartProducts);

module.exports = router;
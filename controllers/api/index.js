const router = require('express').Router();

const userRoutes = require('./user-routes.js');
const cartRoutes = require('./cart.js');
const purchaseRoutes = require('./purchase.js');
const categoriesRoutes = require('./bookCategories.js');

router.use('/users', userRoutes);
router.use('/cart', cartRoutes);
router.use('/purchase', purchaseRoutes);
router.use('/categories', categoriesRoutes);

module.exports = router;

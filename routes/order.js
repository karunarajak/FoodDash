const express = require('express');
const { placeOrder, getOrderStatus } = require('fooddash-backend/controllers/orderController');
const router = express.Router();

router.post('/order', placeOrder);
router.get('/order/:orderId', getOrderStatus);

module.exports = router;

const express = require('express');
const { placeOrder, getOrderStatus } = require('fooddas-backend/controllers/orderController');
const { protect } = require('../middleware/authMiddleware');


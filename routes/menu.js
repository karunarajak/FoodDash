const express = require('express');
const { createMenuItem, updateMenuItem, deleteMenuItem } = require('fooddash-backend/controllers/menuController');
const router = express.Router();

router.post('/restaurant/:id/menu', createMenuItem);
router.put('/restaurant/:restaurantId/menu/:menuId', updateMenuItem);
router.delete('/restaurant/:restaurantId/menu/:menuId', deleteMenuItem);

module.exports = router;

const express = require('express');
const { getMenu, addMenuItem } = require('fooddas-backend/controllers/menuController');
const { protect } = require('../middleware/authMiddleware');



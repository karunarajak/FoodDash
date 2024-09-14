const Order = require('../models/order');

exports.placeOrder = async (req, res) => {
    try {
        const { customerId, restaurantId, items, deliveryAddress, totalPrice } = req.body;
        const newOrder = new Order({
            customerId,
            restaurantId,
            items,
            deliveryAddress,
            totalPrice
        });
        await newOrder.save();
        res.status(201).json({ message: 'Order placed successfully', order: newOrder });
    } catch (err) {
        res.status(500).json({ message: 'Error placing order', error: err });
    }
};

exports.getOrderStatus = async (req, res) => {
    try {
        const order = await Order.findById(req.params.orderId);
        res.status(200).json({ status: order.status });
    } catch (err) {
        res.status(500).json({ message: 'Error fetching order status', error: err });
    }
};

const Order = require('fooddash-backend/models/Order');

// Place an order
exports.placeOrder = async (req, res) => {
    const { restaurantId, items, totalAmount } = req.body;
    const userId = req.user.id;

    try {
        const newOrder = new Order({
            user: userId,
            restaurant: restaurantId,
            items,
            totalAmount,
            status: 'Pending'
        });

        await newOrder.save();
        res.status(201).json(newOrder);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

// Get order status
exports.getOrderStatus = async (req, res) => {
    try {
        const order = await Order.findById(req.params.orderId);
        if (!order) {
            return res.status(404).json({ msg: 'Order not found' });
        }
        res.json({ status: order.status });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

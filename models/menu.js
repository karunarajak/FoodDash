const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    dietaryTags: [{ type: String }],
    restaurantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant', required: true }
});

const MenuItem = mongoose.model('MenuItem', menuItemSchema);
module.exports = MenuItem;

const Restaurant = require('../models/Restaurant');

// Get menu for a specific restaurant
exports.getMenu = async (req, res) => {
    try {
        const restaurant = await Restaurant.findById(req.params.id);
        if (!restaurant) {
            return res.status(404).json({ msg: 'Restaurant not found' });
        }
        res.json(restaurant.menu);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

// Add menu item (for restaurants)
exports.addMenuItem = async (req, res) => {
    const { name, description, price, dietaryTags } = req.body;
    try {
        const restaurant = await Restaurant.findById(req.params.restaurantId);
        if (!restaurant) {
            return res.status(404).json({ msg: 'Restaurant not found' });
        }

        const newItem = { name, description, price, dietaryTags };
        restaurant.menu.push(newItem);

        await restaurant.save();
        res.status(201).json(restaurant.menu);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

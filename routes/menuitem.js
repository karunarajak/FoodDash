const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    price: {
        type: Number,
        required: true
    },
    dietaryTags: {
        type: [String],  // Example: ['vegan', 'gluten-free', etc.]
    }
});

const restaurantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    address: {
        type: String,
        required: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    menu: [menuItemSchema],  // Embed the menu items directly in the restaurant
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Restaurant', restaurantSchema);

const Restaurant = require('fooddash-backend/models/Restaurant');

const addMenuItem = async (req, res) => {
    const { name, description, price, dietaryTags } = req.body;

    try {
        const restaurant = await Restaurant.findById(req.params.restaurantId);
        if (!restaurant) {
            return res.status(404).json({ error: 'Restaurant not found' });
        }

        const newMenuItem = { name, description, price, dietaryTags };
        restaurant.menu.push(newMenuItem);

        await restaurant.save();
        res.status(201).json(restaurant.menu);
    } catch (error) {
        res.status(500).json({ error: 'Error adding menu item' });
    }
};

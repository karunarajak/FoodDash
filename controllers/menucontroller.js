const MenuItem = require('../models/menu');

// Create a menu item
exports.createMenuItem = async (req, res) => {
    try {
        const { name, description, price, dietaryTags } = req.body;
        const newMenuItem = new MenuItem({
            name,
            description,
            price,
            dietaryTags,
            restaurantId: req.params.id
        });
        await newMenuItem.save();
        res.status(201).json({ message: 'Menu item created', menuItem: newMenuItem });
    } catch (err) {
        res.status(500).json({ message: 'Error creating menu item', error: err });
    }
};

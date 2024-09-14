const Restaurant = require('../models/Restaurant');

const createRestaurant = async (req, res) => {
    const { name, description, address } = req.body;
    const owner = req.user.id;  // Assuming the user is authenticated

    try {
        const newRestaurant = new Restaurant({
            name,
            description,
            address,
            owner
        });

        await newRestaurant.save();
        res.status(201).json(newRestaurant);
    } catch (error) {
        res.status(500).json({ error: 'Error creating restaurant' });
    }
};

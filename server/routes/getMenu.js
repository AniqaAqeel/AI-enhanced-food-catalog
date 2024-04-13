const router = require('express').Router();
const { FoodItem } = require('../models/fooditems')
const findUserIdFromToken = require("../utils/findUserIdFromToken");

// Endpoint to get menu items by restaurant ID extracted from token
router.get('/', async (req, res) => {
    const token = req.body.token;
    
    if (!token) {
        return res.status(403).json({ message: 'Authentication token is required.' });
    }

    try {
        const userId = findUserIdFromToken(token);  // Assuming this utility correctly extracts the user ID from the token
        if (!userId) {
            return res.status(401).json({ message: 'Invalid or expired token.' });
        }

        const menuItems = await FoodItem.find({ restaurantId: userId });
        if (menuItems.length === 0) {
            return res.status(404).json({ message: 'No menu items found for this restaurant.' });
        }
        res.json(menuItems);
    } catch (error) {
        console.error('Database error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;

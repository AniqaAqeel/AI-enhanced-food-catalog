const router = require("express").Router();
const { User } = require("../models/user");
const { ResOwner } = require("../models/resowner");
const { FoodItem } = require("../models/fooditems");
const { Order } = require("../models/order");
const { OrderItems } = require("../models/orderitem");
const { Restaurant } = require("../models/restaurant");
const bcrypt = require("bcrypt");
const Joi = require("joi");
const findUserIdFromToken = require("../utils/findUserIdFromToken");

router.get("/", async (req, res) => {
	try {
        const token = req.query.token;
        // const orderId = req.query.order_id;
        if (!token) 
            return res.status(403).send({ message: "No authentication token provided" })
        const userId = findUserIdFromToken(token);

		const user = await ResOwner.findOne({ "_id": userId });
		
		if (!user) 
			return res.status(401).send({ message: "User not logged in" });

		const restaurant = await Restaurant.findOne({ owner_id: userId });
        const order = await Order.find({res_id: restaurant._id});
        if (!order)
            return res.status(400).send({ message: "No order" });

        orderArray = []
        for (const order_item of order) {
            const user = await User.findOne({ _id: order_item.user_id});
            const order_items = await OrderItems.find({ order_id: order_item._id });

            let foodItems = [];
            for (const entry of order_items) {
                const food_item = await FoodItem.findOne({ _id: entry.food_item_id });
                if (food_item) {
                    const { _id, itemName, imageLink } = food_item;
                    const items = { _id, itemName, imageLink };
                    foodItems.push(items);
                }
            }
            orderArray.push(
                {
                    order_id: order_item._id,
                    user_id: user._id,
                    user_name: user.name,
                    user_email: user.email,
                    order_status: order_item.order_status,
                    total_amount: order_item.total_amount,
                    food_items: foodItems
                  }
            )
        }


        

    res.status(200).send( {
        orders: orderArray
    } );
	} catch (error) {
        console.log(error);
		res.status(500).send({ message: "Internal Server Error" });
	}
});

module.exports = router;
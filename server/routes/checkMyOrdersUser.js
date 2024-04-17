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
        const token = req.body.token;
        const orderId = req.body.order_id;
        const userId = findUserIdFromToken(token);

		const user = await User.findOne({ "_id": userId });
		
		if (!user) 
			return res.status(401).send({ message: "User not logged in" });

		const order = await Order.findOne({ _id: orderId });
        if (!order)
            return res.status(400).send({ message: "No such order" });
        const restaurant = await Restaurant.findOne({ _id: order.res_id});
        const order_items = await OrderItems.find({ order_id: orderId });

        let foodItems = [];
        for (const entry of order_items) {
            const food_item = await FoodItem.findOne({ _id: entry.food_item_id });
            if (food_item) {
                const { _id, itemName, imageLink } = food_item;
                const items = { _id, itemName, imageLink };
                foodItems.push(items);
            }
        }
        


        

    res.status(200).send( {
      order_id: order._id,
      res_id: restaurant._id,
      res_name: restaurant.res_name,
      order_status: order.order_status,
      total_amount: order.total_amount,
      food_items: foodItems
    } );
	} catch (error) {
        console.log(error);
		res.status(500).send({ message: "Internal Server Error" });
	}
});

module.exports = router;
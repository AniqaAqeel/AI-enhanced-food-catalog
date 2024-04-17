const router = require("express").Router();
const bcrypt = require("bcrypt");
const { User } = require("../models/user");
const { Restaurant, validateRestaurant } = require("../models/restaurant");
const { FoodItem } = require("../models/fooditems")
const Joi = require("joi");
const findUserIdFromToken = require("../utils/findUserIdFromToken");
const { Order } = require("../models/order");

router.post("/", async (req, res) => {
	try {
        const token = req.body.token;

        if (!token) 
            return res.status(403).send({ message: "No authentication token provided" })
        const userId = findUserIdFromToken(token);

		const user = await User.findOne({ "_id": userId });
        
		
		if (!user) 
			return res.status(401).send({ message: "User not logged in" });

        // const testing = await FoodItem.find();
        // return res.status(200).send({ testing });

        // const restaurantTemp = await Restaurant.findOne({ "_id": req.body.res_id });
        // if (!restaurantTemp)
        //     return res.status(401).send({ message: "Could not find restaurant" });

        // const newRating = (restaurantTemp.weighted_rating + req.body.rating)/2

        // await Restaurant.findByIdAndUpdate(req.body.res_id, { weighted_rating: newRating });

        // const restaurantTemp2 = await Restaurant.findOne({ "_id": req.body.res_id });
        // const { warning_msg, __v, ...restaurant } = restaurantTemp2.toObject();
        // const food_items = await FoodItem.find({ "restaurantId": req.body.res_id });
        // if (!food_items)
        //     return res.status(401).send({ message: "Could not find food items for restaurant" });
        
        // res.status(200).send({ 
        //     restaurant,
        //     food_items 
        // });
        const order_id = req.body.order_id;
        if (!order_id)
        {
            return res.status(400).send({message:"No Order Id is provided"});
        }
        const order = await Order.findById(order_id);
        if (!order)
        {
            return res.status(401).send({message:"Could not find Order"});
        }
        if (order.user_id != userId)
        {
            return res.status(403).send({message:"You are not authorized to rate"});
        }
        const restaurantTemp = await Restaurant.findOne({ "_id": order.res_id });
        if (!restaurantTemp)
            return res.status(401).send({ message: "Could not find restaurant" });

        const newRating = (restaurantTemp.weighted_rating + req.body.rating)/2

        await Restaurant.findByIdAndUpdate(order.res_id, { weighted_rating: newRating });
        await Order.findByIdAndUpdate(order.id,{order_status:"rated"});
        return res.status(200).send({message:"Rating Save Sucessfully"});


	} catch (error) {
		console.log(error)
		res.status(500).send({ message: "Internal Server Error" });
	}
});

module.exports = router;
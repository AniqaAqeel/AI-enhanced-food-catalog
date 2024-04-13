const router = require("express").Router();
const bcrypt = require("bcrypt");
const { User } = require("../models/user");
const { Restaurant, validateRestaurant } = require("../models/restaurant");
const { FoodItem } = require("../models/fooditems");
const Joi = require("joi");
const findUserIdFromToken = require("../utils/findUserIdFromToken");
const { ResOwner } = require("../models/resowner");
const fs = require('fs');
const path = require("path");


const image_dir = path.join(__dirname, "../src/images/661710a74bdafdecfc45e96a.jpg");

router.post("/", async (req, res) => {
	try {
        const token = req.body.token;
        const userId = findUserIdFromToken(token);

		const user = await User.findOne({ "_id": userId })
		
		if (!user) 
			return res.status(401).send({ message: "User not logged in" });

        // const testing = await FoodItem.find();
        // return res.status(200).send({ testing });

        const food_items = await FoodItem.find({ "restaurantId": req.body.res_id });
        if (!food_items)
            return res.status(401).send({ message: "Could not find food items for restaurant" });

        const restaurantTemp = await Restaurant.findOne({ "_id": req.body.res_id });
        if (!restaurantTemp)
            return res.status(401).send({ message: "Could not find restaurant" });

        // const { warning_msg, __v, ...restaurant } = restaurantTemp.toObject();

        // res.status(200).send({ 
        //     restaurant,
        //     food_items 
        // });

        // const imagePath = "D:\LUMS Studies\Sem8\SE\Project_newnew\AI-enhanced-food-catalog\server\src\images\661710a74bdafdecfc45e96a.jpg"; // Assuming images are named with restaurant IDs
        const image = fs.readFileSync(image_dir);
        const base64Image = Buffer.from(image).toString('base64');
    
        const { warning_msg, __v, ...restaurantData } = restaurantTemp.toObject();
    
        res.status(200).send({ 
          restaurant: {
            ...restaurantData,
            image: base64Image
          },
          food_items 
        });

	} catch (error) {
		console.log(error)
		res.status(500).send({ message: "Internal Server Error" });
	}
});

module.exports = router;
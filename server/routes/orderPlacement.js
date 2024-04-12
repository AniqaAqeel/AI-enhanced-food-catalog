const router = require("express").Router();
const { User } = require("../models/user");
const { FoodItem } = require("../models/fooditems")
const bcrypt = require("bcrypt");
const Joi = require("joi");
const findUserIdFromToken = require("../utils/findUserIdFromToken")

router.post("/", async (req, res) => {
    // const uniqueResIds = new Set(req.body.order.map(item => item.res_id));
    // const uniqueResIdsArray = Array.from(uniqueResIds);
    // console.log(uniqueResIdsArray)
    // return 
	try {
        let orderItemJson;
        let odersJson;
        const token = req.body.token;
        const userId = findUserIdFromToken(token);

		// const user = await User.findOne({ "_id": userId });
		
		// if (!user) 
		// 	return res.status(401).send({ message: "User not logged in" });

        const uniqueResIds = new Set(req.body.order.map(item => item.res_id));
        const uniqueResIdsArray = Array.from(uniqueResIds);

        uniqueResIdsArray.forEach(async (resId) => {
            console.log(`Restaurant ID: ${resId}`);

            const itemsForRestaurant = req.body.order.filter(item => item.res_id === resId);
            const foodItemIds = itemsForRestaurant.map(item => item.food_item_id);
            console.log(foodItemIds)

            for (let foodItemId of foodItemIds) {
                const foodItem = await FoodItem.findOne({ "_id": foodItemId })
                console.log(foodItem)
            }


        });

        return
		

		res.status(200).send( 
			{
				name: resowner.name,
				email: resowner.email,
				phone_no: resowner.phone_no
			}
		 );
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
});

module.exports = router;

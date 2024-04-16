const router = require("express").Router();
// const { User } = require("../models/user");
const { ResOwner } = require("../models/resowner");
const { FoodItem } = require("../models/fooditems");
const { Order } = require("../models/order");
const { OrderItems } = require("../models/orderitem");
const bcrypt = require("bcrypt");
const Joi = require("joi");
const findUserIdFromToken = require("../utils/findUserIdFromToken");

router.post("/", async (req, res) => {
	try {
        const food_item_id = req.body.food_item_id;
        const token = req.body.token;
        const userId = findUserIdFromToken(token);

		const resowner = await ResOwner.findOne({ "_id": userId });
		
		if (!resowner) 
			return res.status(401).send({ message: "User not logged in" });

        FoodItem.findOneAndDelete({ _id: food_item_id }, (err, result) => {
            if (err) {
                console.error("Error deleting document:", err);
                return;
            }
            if (!result) {
                console.log("No document found matching the condition.");
                return;
            }
            console.log("Document deleted successfully:", result);
        });
        
    res.status(200).send( {
      message: "ok"
    } );
	} catch (error) {
        console.log(error);
		res.status(500).send({ message: "Internal Server Error" });
	}
});

module.exports = router;
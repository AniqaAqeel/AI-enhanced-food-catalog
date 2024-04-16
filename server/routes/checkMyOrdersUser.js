const router = require("express").Router();
const { User } = require("../models/user");
const { ResOwner } = require("../models/resowner");
const { FoodItem } = require("../models/fooditems");
const { Order } = require("../models/order");
const { OrderItems } = require("../models/orderitem");
const bcrypt = require("bcrypt");
const Joi = require("joi");
const findUserIdFromToken = require("../utils/findUserIdFromToken");

router.post("/", async (req, res) => {
	try {
        const token = req.body.token;
        const userId = findUserIdFromToken(token);

		const user = await User.findOne({ "_id": userId });
		
		if (!user) 
			return res.status(401).send({ message: "User not logged in" });
        
    res.status(200).send( {
      message: "ok"
    } );
	} catch (error) {
        console.log(error);
		res.status(500).send({ message: "Internal Server Error" });
	}
});

module.exports = router;
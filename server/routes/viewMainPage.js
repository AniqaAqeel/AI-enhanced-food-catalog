const router = require("express").Router();
const bcrypt = require("bcrypt");
const { User } = require("../models/user");
const { Restaurant, validateRestaurant } = require("../models/restaurant");
const Joi = require("joi");
const findUserIdFromToken = require("../utils/findUserIdFromToken")

router.post("/", async (req, res) => {
	try {
        const token = req.body.token;
        const userId = findUserIdFromToken(token);

		const user = await User.findOne({ "_id": userId })
		
		if (!user) 
			return res.status(401).send({ message: "User not logged in" });


        const restaurants = await Restaurant.find();

        res.status(200).send({ restaurants });

	} catch (error) {
		console.log(error)
		res.status(500).send({ message: "Internal Server Error" });
	}
});

module.exports = router;

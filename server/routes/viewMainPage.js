const router = require("express").Router();
const bcrypt = require("bcrypt");
const { User } = require("../models/user");
const { Restaurant, validateRestaurant } = require("../models/restaurant");
const Joi = require("joi");
const findUserIdFromToken = require("../utils/findUserIdFromToken")
const path = require("path");
const fs = require('fs');

const image_dir = path.join(__dirname, "../src/images/");

router.get("/", async (req, res) => {
	try {
        const token = req.query.token;
		if (!token) {
			return res.status(403).send({ message: "No authentication token provided." });
		  }
        const userId = findUserIdFromToken(token);

		if (!userId) {
			return res.status(401).send({ message: "Unauthorized" });
		}


        const restaurants = await Restaurant.find();

		const restaurantsWithImages = await Promise.all(restaurants.map(async restaurant => {
			
			// const files = await fs.promises.readdir(image_dir)
			// const tempFile = files.find(file => file.startsWith(restaurant.owner_id.toString()));
			// let base64Image;
			// if (tempFile) {
			// 	const image = fs.readFileSync(path.join(image_dir, tempFile));
			// 	// Convert image to base64
			// 	base64Image = Buffer.from(image).toString('base64');
			// } else {
			// 	base64Image = "";
			// }
			
			return {
			  _id: restaurant._id,
			  owner_id: restaurant.owner_id,
			  res_name: restaurant.res_name,
			  cuisine: restaurant.cuisine,
			  weighted_rating: restaurant.weighted_rating,
			  warning_msg: restaurant.warning_msg,
			};
		  }));
	  
		  res.status(200).send({ restaurants: restaurantsWithImages });	  

        // res.status(200).send({ restaurants });

	} catch (error) {
		console.log(error)
		res.status(500).send({ message: "Internal Server Error" });
	}
});

module.exports = router;

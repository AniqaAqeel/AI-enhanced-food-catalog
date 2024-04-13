const router = require("express").Router();
const bcrypt = require("bcrypt");
const { User } = require("../models/user");
const { Restaurant, validateRestaurant } = require("../models/restaurant");
const Joi = require("joi");
const findUserIdFromToken = require("../utils/findUserIdFromToken")
const path = require("path");

const image_dir = path.join(__dirname, "../src/images/");

router.post("/", async (req, res) => {
	try {
        const token = req.body.token;
        const userId = findUserIdFromToken(token);

		const user = await User.findOne({ "_id": userId })
		
		if (!user) 
			return res.status(401).send({ message: "User not logged in" });


        const restaurants = await Restaurant.find();

		const restaurantsWithImages = await Promise.all(restaurants.map(async restaurant => {
			
			const files = await fs.promises.readdir(image_dir)
			const tempFile = files.find(file => file.startsWith(restaurant.owner_id.toString()));
			
			if (tempFile) {
				const image = fs.readFileSync(path.join(image_dir, tempFile));
				// Convert image to base64
				const base64Image = Buffer.from(image).toString('base64');
			} else {
				const base64Image = "";
			}
			
			return {
			  _id: restaurant._id,
			  owner_id: restaurant.owner_id,
			  res_name: restaurant.res_name,
			  cuisine: restaurant.cuisine,
			  weighted_rating: restaurant.weighted_rating,
			  warning_msg: restaurant.warning_msg,
			  image: base64Image
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

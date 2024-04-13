const router = require("express").Router();
const bcrypt = require("bcrypt");
const { ResOwner, validate } = require("../models/resowner");
const { User } = require("../models/user");
const { Restaurant, validateRestaurant } = require("../models/restaurant");
const Joi = require("joi");

router.post("/", async (req, res) => {
	// console.log(req.body)
	// return 
	try {
		const { error } = validate(req.body.res_owner);
		if (error) {
			return res.status(400).send({ message: error.details[0].message });
		}
		const resowner = await ResOwner.findOne({ email: req.body.res_owner.email });
		const user = await User.findOne({ email: req.body.res_owner.email });
		if (resowner || user)
			return res
				.status(409)
				.send({ message: "User with given email already Exist!" });

		const salt = await bcrypt.genSalt(Number(process.env.SALT));
		const hashPassword = await bcrypt.hash(req.body.res_owner.password, salt);

		const newUser = new ResOwner({ ...req.body.res_owner, password: hashPassword,role:"resowner" });
		//dummy values input for now---------------------------------------------------------------------------------->>>>>>>>>>>>>>>>>>>>>>
		// Commenting out for now
		const restaurant = {
			owner_id: newUser._id, 
			res_name: req.body.restaurant.res_name, 
			cuisine: req.body.restaurant.cuisine, 
			weighted_rating: 0, 
			warning_msg: "", 
		}

		const { errorRes } = validateRestaurant(restaurant);
		if (errorRes) {
			return res.status(400).send({ message: error.details[0].message });
		}

		const existingRestaurant = await Restaurant.findOne({ res_name: restaurant.res_name });
		if (existingRestaurant) {
			return res.status(409).send({ message: "Restaurant with given name already exists" });
		}

		await new Restaurant(
			restaurant
		).save();
		// ----------------------------------------------------------------------------------------------------------->>>>>>>>>>>>>>>>>>>>>>
		await newUser.save();

		res.status(201).send({ message: "User created successfully" });
	} catch (error) {
		console.log(error)
		res.status(500).send({ message: "Internal Server Error" });
	}
});

module.exports = router;

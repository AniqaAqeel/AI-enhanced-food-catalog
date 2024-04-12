const router = require("express").Router();
const bcrypt = require("bcrypt");
const { ResOwner, validate } = require("../models/resowner");
const { Restaurant, validateRestaurant } = require("../models/restaurant");
const Joi = require("joi");

router.post("/", async (req, res) => {
	try {
		const { error } = validate(req.body);
		if (error) {
			return res.status(400).send({ message: error.details[0].message });
		}
		const user = await ResOwner.findOne({ email: req.body.email });
		if (user)
			return res
				.status(409)
				.send({ message: "User with given email already Exist!" });

		const salt = await bcrypt.genSalt(Number(process.env.SALT));
		const hashPassword = await bcrypt.hash(req.body.password, salt);

		const newUser = new ResOwner({ ...req.body, password: hashPassword,role:"resowner" });
		//dummy values input for now---------------------------------------------------------------------------------->>>>>>>>>>>>>>>>>>>>>>
		// Commenting out for now
		// const restaurant = {
		// 	owner_id: newUser._id, 
		// 	res_name: "dummy2", 
		// 	cuisine: "dummy1", 
		// 	weighted_rating: 10, 
		// 	warning_msg: "dummy", 
		// }

		// const { errorRes } = validateRestaurant(restaurant);
		// if (errorRes) {
		// 	return res.status(400).send({ message: error.details[0].message });
		// }

		// const existingRestaurant = await Restaurant.findOne({ res_name: restaurant.res_name });
		// if (existingRestaurant) {
		// 	return res.status(409).send({ message: "Restaurant with given name already exists" });
		// }
		// await new Restaurant(
		// 	restaurant
		// ).save();
		// ----------------------------------------------------------------------------------------------------------->>>>>>>>>>>>>>>>>>>>>>
		await newUser.save();

		res.status(201).send({ message: "User created successfully" });
	} catch (error) {
		console.log(error)
		res.status(500).send({ message: "Internal Server Error" });
	}
});

module.exports = router;

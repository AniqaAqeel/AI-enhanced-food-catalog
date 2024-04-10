const router = require("express").Router();
const bcrypt = require("bcrypt");
const { ResOwner, validate } = require("../models/resowner");

router.post("/", async (req, res) => {
	try {
		const { error } = validate(req.body);
		if (error) {
			console.log(req.body)
			return res.status(400).send({ message: error.details[0].message });
		}
		const user = await ResOwner.findOne({ email: req.body.email });
		if (user)
			return res
				.status(409)
				.send({ message: "User with given email already Exist!" });

		const salt = await bcrypt.genSalt(Number(process.env.SALT));
		const hashPassword = await bcrypt.hash(req.body.password, salt);

		await new ResOwner({ ...req.body, password: hashPassword,role:"resowner" }).save();
		res.status(201).send({ message: "User created successfully" });
	} catch (error) {
		console.log(error)
		res.status(500).send({ message: "Internal Server Error" });
	}
});

module.exports = router;

const router = require("express").Router();
const { User } = require("../models/user");
const { ResOwner } = require("../models/resowner");
const bcrypt = require("bcrypt");
const Joi = require("joi");

router.post("/", async (req, res) => {
	try {
        let person;
		const { error } = validate(req.body);
		if (error)
			return res.status(400).send({ message: error.details[0].message });

		person = await User.findOne({ email: req.body.email });

		if (!person) {
            person = await ResOwner.findOne({ email: req.body.email });
        }
            
		if (!person)
			return res.status(401).send({ message: "Invalid Email or Password" });
		console.log(person);

		const validPassword = await bcrypt.compare(
			req.body.password,
			person.password
		);
		
		if (!validPassword)
			return res.status(401).send({ message: "Invalid Email or Password" });

		const token = person.generateAuthToken();
		//const token = "123";
		res.status(200).send({ data: {
			token:token,
			user:{
				name:person.name,
				email:person.email,
				role:person.role
			}
		}, message: "logged in successfully" });
	} catch (error) {
        console.log(error)
		res.status(500).send({ message: "Internal Server Error" });
	}
});

const validate = (data) => {
	const schema = Joi.object({
		email: Joi.string().email().required().label("Email"),
		password: Joi.string().required().label("Password"),
	});
	return schema.validate(data);
};

module.exports = router;
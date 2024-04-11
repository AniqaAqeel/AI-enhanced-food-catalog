const router = require("express").Router();
const { User } = require("../models/user");
const { ResOwner } = require("../models/resowner");
const bcrypt = require("bcrypt");
const Joi = require("joi");
const findUserIdFromToken = require("../utils/findUserIdFromToken")

router.get("/", async (req, res) => {
	try {
        const token_temp = req.body.token;
        const userId = findUserIdFromToken(token_temp);
		let person;
		let outJson;

		if (req.body.role === "user"){
			person = await User.findOne({ "_id": userId })
		} else {
			person = await ResOwner.findOne({ "_id": userId })
		}
		
		
		if (!person) 
			return res.status(401).send({ message: "User not logged in" });

		// if (user.email != req.body.email) 
		// 	return res.status(401).send({ message: "Invalid email" });
		outJson = {
			name: person.name,
			email: person.email
		}

		if (req.body.role === "user") {
			outJson.desc = person.desc
		} else {
			outJson.phone_no = person.phone_no
		}
		
		console.log(outJson)
		
		res.status(200).send( 
			outJson
		 );
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
});

module.exports = router;

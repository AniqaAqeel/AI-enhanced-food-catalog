const router = require("express").Router();
const { ResOwner } = require("../models/resowner");
const bcrypt = require("bcrypt");
const Joi = require("joi");
const findUserIdFromToken = require("../utils/findUserIdFromToken")

router.get("/", async (req, res) => {
	try {
        const token_temp = req.body.token;
        const userId = findUserIdFromToken(token_temp);

		const resowner = await ResOwner.findOne({ "_id": userId });
		
		if (!resowner) 
			return res.status(401).send({ message: "User not logged in" });

		// if (user.email != req.body.email) 
		// 	return res.status(401).send({ message: "Invalid email" });
		

		res.status(200).send( 
			{
				name: resowner.name,
				email: resowner.email,
				phone_no: resowner.phone_no
			}
		 );
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
});

module.exports = router;

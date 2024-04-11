const router = require("express").Router();
const { User } = require("../models/user");
const bcrypt = require("bcrypt");
const Joi = require("joi");
const findUserIdFromToken = require("../utils/findUserIdFromToken")

router.post("/", async (req, res) => {
	try {
        const token_temp = req.body.token;
        const userId = findUserIdFromToken(token_temp);

		const user = await User.findOne({ "_id": userId })
		
		if (!user) 
			return res.status(401).send({ message: "User not logged in" });

		// if (user.email != req.body.email) 
		// 	return res.status(401).send({ message: "Invalid email" });
		
		
		res.status(200).send( 
			{
				name: user.name,
				email: user.email,
				desc: user.desc
			}
		 );
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
});

module.exports = router;

const express = require("express");
const router = express.Router();
const { User } = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// Define findUserIdFromToken function
const findUserIdFromToken = (token) => {
    try {
        const decoded = jwt.verify(token, process.env.JWTPRIVATEKEY);
        return decoded._id;
    } catch (error) {
        console.error("Error decoding token:", error);
        return null;
    }
};

// Route to update user password
router.post("/", async (req, res) => {
    try {
        const token = req.body.token;
        const userId = findUserIdFromToken(token);

		user = await User.findOne({ "_id": userId })
		
		if (!user) 
			return res.status(401).send({ message: "User not logged in" });
		
		const validPassword = await bcrypt.compare(
			req.body.currPassword,
			user.password
		);
		
		if (!validPassword)
			return res.status(401).send({ message: "Invalid Password" });

		const salt = await bcrypt.genSalt(Number(process.env.SALT));
		const hashPassword = await bcrypt.hash(req.body.newPassword, salt);

        await User.findByIdAndUpdate(userId, { password: hashPassword });

        res.status(200).send({ message: "Password updated successfully" });
    } catch (error) {
        console.error("Error updating password:", error);
        res.status(500).send({ message: "Internal Server Error" });
    }
});

module.exports = router;
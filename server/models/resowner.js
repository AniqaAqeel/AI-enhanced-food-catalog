const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const userSchema = new mongoose.Schema({
	name: { type: String, required: true },
	email: { type: String, required: true },
	password: { type: String, required: true },
	phone_no: { type: String, required: true },
});

userSchema.methods.generateAuthToken = function () {
	const token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY, {
		expiresIn: "7d",
	});
	return token;
};

const ResOwner = mongoose.model("res_owner", userSchema);

const validate = (data) => {
	const schema = Joi.object({
		name: Joi.string().required().label("User_name"),
		email: Joi.string().email().required().label("Email"),
		password: passwordComplexity().required().label("Password"),
		phone_no: Joi.string().required().label("Phone_no"),
	});
	return schema.validate(data);
};

module.exports = { ResOwner, validate };

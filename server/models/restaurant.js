const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    owner_id: {type: mongoose.Schema.Types.ObjectId, ref : 'res_owners'},
	res_name: { type: String, required: true },
	cuisine: { type: String, required: true, unique: true },
	weighted_rating: { type: Number, required: true },
	warning_msg: { type: String },
});

const Restaurant = mongoose.model("restaurants", userSchema);

const validateRestaurant = (data) => {
    const schema = Joi.object({
        owner_id: Joi.string().required().label("Owner ID"),
        res_name: Joi.string().required().label("Restaurant Name"),
        cuisine: Joi.string().required().label("Cuisine"),
        weighted_rating: Joi.number().required().label("Weighted Rating"),
        warning_msg: Joi.string().label("Warning Message"),
    });
    return schema.validate(data);
};

module.exports = { Restaurant, validateRestaurant };
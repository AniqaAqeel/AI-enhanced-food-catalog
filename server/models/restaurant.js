const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    owner_id: {type: mongoose.Schema.Types.ObjectId, ref : 'res_owner'},
	res_name: { type: String, required: true },
	cuisine: { type: String, required: true, unique: true },
	weighted_rating: { type: String, required: true },
	warning_msg: { type: String },
});

const Restaurant = mongoose.model("restaurants", userSchema);

module.exports = { Restaurant };
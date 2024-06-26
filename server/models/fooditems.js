const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const foodItemSchema = new Schema({
    restaurantId: {type: Schema.Types.ObjectId, ref : 'res_owner', required: true},
    itemName: {type: String, required: true},
	itemPrice: { type: Number, required: true },
	itemDescription: { type: String, required: true },
	imageLink: { type: String, required: false },
	itemTags: { type: String, required: false },
	embedding: { type: [Number], required: false} // Represent the vector embedding of the item description
});

const FoodItem = mongoose.model("food_items", foodItemSchema);

module.exports = { FoodItem };
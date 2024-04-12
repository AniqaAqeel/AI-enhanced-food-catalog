const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    order_id: {type: mongoose.Schema.Types.ObjectId, ref : 'orders', required: true},
    food_item_id: {type: mongoose.Schema.Types.ObjectId, ref : 'food_items', required: true},
	quantity: { type: Number, required: true },
	subtotal: { type: Number, required: true },
});

const OrderItems = mongoose.model("order_items", userSchema);

const validateOrderItem = (data) => {
    const schema = Joi.object({
        order_id: Joi.string().required().label("Order ID"),
        food_item_id: Joi.string().required().label("Food Item ID"),
        quantity: Joi.number().required().label("Quantity"),
        subtotal: Joi.number().required().label("Subtotal"),
    });
    return schema.validate(data);
};

module.exports = { OrderItems, validateOrderItem };
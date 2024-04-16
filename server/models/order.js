const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    user_id: {type: mongoose.Schema.Types.ObjectId, ref : 'users', required: true},
    res_id: {type: mongoose.Schema.Types.ObjectId, ref : 'restaurants', required: true},
	order_date: { type: Date, required: true },
	total_amount: { type: Number, required: true },
    order_status: { type: String, required: true },
});

const Order = mongoose.model("orders", userSchema);

const validateOrder = (data) => {
    const schema = Joi.object({
        user_id: Joi.string().required().label("User ID"),
        res_id: Joi.string().required().label("Restaurant ID"),
        order_date: Joi.date().required().label("Order Date"),
        total_amount: Joi.number().required().label("Total Amount"),
        order_status: Joi.string().required().label("Order Status")
    });
    return schema.validate(data);
};

module.exports = { Order, validateOrder };
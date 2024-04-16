const router = require("express").Router();
const { User } = require("../models/user");
const { FoodItem } = require("../models/fooditems");
const { Order } = require("../models/order");
const { OrderItems } = require("../models/orderitem");
const bcrypt = require("bcrypt");
const Joi = require("joi");
const findUserIdFromToken = require("../utils/findUserIdFromToken");

router.post("/", async (req, res) => {
	try {
        let orderItemJson;
        const token = req.body.token;
        const order_id = req.body.order_id;
        const userId = findUserIdFromToken(token);

		const user = await User.findOne({ "_id": userId });
		
		if (!user) 
			return res.status(401).send({ message: "User not logged in" });

        Order.findOneAndDelete({ _id: order_id }, (err, result) => {
            if (err) {
                console.error("Error deleting document:", err);
                return;
            }
            if (!result) {
                console.log("No document found matching the condition.");
                return;
            }
            console.log("Document deleted successfully:", result);
        });

        OrderItems.deleteMany({ order_id: order_id }, (err, result) => {
            if (err) {
                console.error("Error deleting documents:", err);
                return;
            }
            if (!result) {
                console.log("No document found matching the condition.");
                return;
            }
            console.log(result.deletedCount + " documents deleted successfully");
        });
        
    res.status(200).send( {
      message: "ok"
    } );
	} catch (error) {
        console.log(error);
		res.status(500).send({ message: "Internal Server Error" });
	}
});

module.exports = router;
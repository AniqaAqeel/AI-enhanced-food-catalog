const router = require("express").Router();
const { User } = require("../models/user");
const { FoodItem } = require("../models/fooditems");
const { Order } = require("../models/order");
const { OrderItems } = require("../models/orderitem");
const bcrypt = require("bcrypt");
const Joi = require("joi");
const findUserIdFromToken = require("../utils/findUserIdFromToken");
const { ResOwner } = require("../models/resowner");
const { Restaurant } = require("../models/restaurant");


router.delete("/", async (req, res) => {
    try {
        const token = req.query.token;
        if (!token) 
            return res.status(403).send({ message: "No authentication token provided" })
        const userId = findUserIdFromToken(token);

        if (!userId)
        {
            return res.status(401).send({ message: "User not logged in" });
        }
        const restaurant = Restaurant.find({"owner_id":userId});
        if (!restaurant)
        {
            return res.status(401).send({ message: "User not a restaurant owner" });
        }
        const restaurant_id = restaurant._id;
        const product_id = req.query.product_id;
        const product = FoodItem.find({"restaurant_id":restaurant_id,"_id":product_id});
        if (!product)
        {
            return res.status(401).send({ message: "Product not found" });
        }
        await FoodItem.deleteOne({"restaurant_id":restaurant_id,"_id":product_id});
        return res.status(200).send( {
            message: "Product deleted"
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Internal Server Error" });
    }
})

module.exports = router;




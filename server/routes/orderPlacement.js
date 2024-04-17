const router = require("express").Router();
const { User } = require("../models/user");
const { FoodItem } = require("../models/fooditems");
const { Order } = require("../models/order");
const { OrderItems } = require("../models/orderitem");
const bcrypt = require("bcrypt");
const Joi = require("joi");
const findUserIdFromToken = require("../utils/findUserIdFromToken");

router.post("/", async (req, res) => {
  // const uniqueResIds = new Set(req.body.order.map(item => item.res_id));
  // const uniqueResIdsArray = Array.from(uniqueResIds);
  // console.log(uniqueResIdsArray)
  // return
  try {
    const token = req.body.token;
    if (!token) 
      return res.status(403).send({ message: "No authentication token provided" })
    const delivery_address = req.body.delivery_address;
    if (!delivery_address)
      return res.status(400).send({ message: "No delivery address provided" });

    const userId = findUserIdFromToken(token);

    if (!userId) return res.status(401).send({ message: "User not logged in" });
    const user = await User.findOne({ "_id": userId });
    if (!user) return res.status(401).send({ message: "User not logged in" });


    // find res_id for each
    let ordersJson = req.body.order;
    for (const item of ordersJson) {
      const foodItem = await FoodItem.findOne({ _id: item.food_item_id });
      console.log(foodItem)
      item["res_id"] = foodItem.restaurantId;
      item["itemPrice"] = foodItem.itemPrice;
    }

    // console.log(ordersJson);
    const transformedArray = [];

    const groupedItems = ordersJson.reduce((acc, curr) => {
      if (!acc[curr.res_id]) {
        acc[curr.res_id] = [];
      }
      acc[curr.res_id].push({
        food_item_id: curr.food_item_id,
        quantity: curr.quantity,
        itemPrice: curr.itemPrice,
      });
      return acc;
    }, {});

    for (const res_id in groupedItems) {
      const items = groupedItems[res_id].map((item) => ({
        food_item_id: item.food_item_id,
        quantity: item.quantity,
        itemPrice: item.itemPrice,
      }));
      transformedArray.push({ res_id, items });
    }

    returnJsonArray = [];

    transformedArray.forEach((entry) => {
      console.log(`Res ID: ${entry.res_id}`);
      let total_Amount = 0;
      const orders = new Order({
        user_id: userId,
        res_id: entry.res_id,
        order_date: new Date(),
        total_amount: 0,
        order_status: "open",
        delivery_address: delivery_address,
      });

      entry.items.forEach((item) => {
        console.log(
          `Food ID: ${item.food_item_id}, Quantity: ${item.quantity}, itemPrice: ${item.itemPrice}`
        );

        let subtotal = item.quantity * item.itemPrice;
        total_Amount += subtotal;
        const order_item = new OrderItems({
          order_id: orders._id,
          food_item_id: item.food_item_id,
          quantity: item.quantity,
          subtotal: subtotal,
        });

        console.log(order_item);
        order_item
          .save()
          .then(() => console.log("order_item saved successfully"))
          .catch((err) => console.error("Error saving order", err));
      });

      orders.total_amount = total_Amount;
      orders
        .save()
        .then(() => console.log("orders saved successfully"))
        .catch((err) => console.error("Error saving order", err));

      returnJsonArray.push({
        order_id: orders._id,
      });
    });

    // const uniqueResIds = new Set(req.body.order.map(item => item.res_id));
    // const uniqueResIdsArray = Array.from(uniqueResIds);

    // uniqueResIdsArray.forEach(async (resId) => {
    //     console.log(`Restaurant ID: ${resId}`);

    //     const itemsForRestaurant = req.body.order.filter(item => item.res_id === resId);
    //     const foodItemIds = itemsForRestaurant.map(item => item.food_item_id);
    //     console.log(foodItemIds)

    //     for (let foodItemId of foodItemIds) {
    //         const foodItem = await FoodItem.findOne({ "_id": foodItemId })
    //         console.log(foodItem)
    //     }

    // });

    // return

    res.status(200).send({
      order_ids: returnJsonArray,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

module.exports = router;

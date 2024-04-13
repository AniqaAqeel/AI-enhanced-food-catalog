const router = require("express").Router();
const cors = require("cors");
const multer = require("multer");
const { ResOwner } = require("../models/resowner");
const { FoodItem } = require("../models/fooditems");
const fs = require("fs");
const findUserIdFromToken = require("../utils/findUserIdFromToken");

router.post("/", async (req, res) => {
  try {
    const token = req.body.token; // Extract token from Authorization header
    if (!token) {
      return res
        .status(403)
        .send({ message: "No authentication token provided." });
    }
    const userId = findUserIdFromToken(token);
    if (!userId) {
      return res
        .status(401)
        .send({ message: "User not authenticated or does not exist." });
    }

    const resowner = await ResOwner.findById(userId);
    if (!resowner) {
      return res
        .status(401)
        .send({ message: "User not authenticated or does not exist." });
    }
    const item_list = req.body.item_list;
    let promises = [];
    //Save items to database
    const item_descriptions = [];
    for (let i = 0; i < item_list.length; i++) {
      const item_name = item_list[i].name;
      const item_tags = item_list[i].tag;
      const price = item_list[i].price;
      const description = item_list[i].description;
      console.log(item_name, item_tags, price, description);
      const id = item_list[i].id;
      if (!item_name || !item_tags || !price || !description) {
        return res
          .status(400)
          .json({ message: `Item with ID:${id} was unsucessful.` });
      }
      const item = new FoodItem({
        restaurantId: userId,
        itemName: item_name,
        itemPrice: price,
        itemDescription: description,
        itemTags: item_tags,
      });
      const savedItem = item.save();
      promises.push(savedItem);
    }
    try {
      await Promise.all(promises);
      return res.status(200).json({ message: "Items saved successfully." });
    } catch (error) {
      console.error(error);
      return res.status(500).send({ message: "Internal server error." });
    }

  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: "Internal server error." });
  }
});

module.exports = router;
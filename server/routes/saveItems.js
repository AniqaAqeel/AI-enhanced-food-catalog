const router = require("express").Router();
const { ResOwner } = require("../models/resowner");
const { FoodItem } = require("../models/fooditems");
const { Restaurant} = require("../models/restaurant");
const findUserIdFromToken = require("../utils/findUserIdFromToken");
const { GoogleGenerativeAI } = require("@google/generative-ai");

// Setup Google Generative AI API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_KEY);
const model = genAI.getGenerativeModel({ model: "embedding-001" });

router.post("/", async (req, res) => {
  try {
    const token = req.body.token;
    
    if (!token) {
      return res.status(403).send({ message: "No authentication token provided." });
    }
    const userId = findUserIdFromToken(token);
    if (!userId) {
      return res.status(401).send({ message: "User not authenticated or does not exist." });
    }

    const resowner = await ResOwner.findById(userId);
    if (!resowner) {
      return res.status(401).send({ message: "User not authenticated or does not exist." });
    }

    const restaurant = await Restaurant.findOne({ "owner_id": userId });
    if (!restaurant) {
      return res.status(401).send({ message: "Restaurant does not exist." });
    }

    const item_list = req.body.item_list;
    let promises = [];

    for (let i = 0; i < item_list.length; i++) {
      const { name, tag, price, description } = item_list[i];
      if (!name || !tag || !price || !description) {
        return res.status(400).json({ message: `Item with ID:${item_list[i].id} was unsuccessful.` });
      }

      // Generate embedding
      let embedding;
      try {
        const result = await model.embedContent(description);
        embedding = result.embedding.values;
      } catch (err) {
        console.error("Failed to generate embedding:", err);
        continue; // Optionally handle error more gracefully
      }

      const item = new FoodItem({
        restaurantId: restaurant._id,
        itemName: name,
        itemPrice: price,
        itemDescription: description,
        itemTags: tag,
        embedding: embedding
      });
      promises.push(item.save());
    }

    try {
      await Promise.all(promises);
      return res.status(200).json({ message: "Items saved successfully with embeddings." });
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

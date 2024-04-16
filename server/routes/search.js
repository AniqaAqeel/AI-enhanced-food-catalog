const router = require("express").Router();
const { FoodItem } = require("../models/fooditems");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const math = require("mathjs");

// Setup Google Generative AI API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_KEY);
const model = genAI.getGenerativeModel({ model: "embedding-001" });

// Function to calculate cosine similarity
function cosineSimilarity(vecA, vecB) {
  const dotProduct = math.dot(vecA, vecB);
  const normA = math.norm(vecA) || 1;
  const normB = math.norm(vecB) || 1;
  return dotProduct / (normA * normB);
}

// Define a minimum score cutoff
const MIN_SCORE_CUTOFF = 0.01;  // Set this to a suitable value

// Search API endpoint
router.get("/", async (req, res) => {
  try {
    const { query } = req.query;
    if (!query) {
      return res.status(400).json({ message: "No query provided." });
    }

    // Generate embedding for the query
    const result = await model.embedContent(query);
    const queryEmbedding = result.embedding.values;

    // Retrieve all items and calculate their similarity
    const items = await FoodItem.find({});
    const scoredItems = items.map(item => ({
      item,
      score: cosineSimilarity(queryEmbedding, item.embedding)
    })).filter(({ score }) => score >= MIN_SCORE_CUTOFF);  // Filter items based on score cutoff

    // Sort by score in descending order and take the top 10
    scoredItems.sort((a, b) => b.score - a.score);
    const topItems = scoredItems.slice(0, 10);

    // Format response
    const response = topItems.map(({ item, score }) => ({
      itemName: item.itemName,
      itemPrice: item.itemPrice,
      itemDescription: item.itemDescription,
      itemTags: item.itemTags,
      score: score.toFixed(2)
    }));

    res.json(response);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal server error." });
  }
});

module.exports = router;

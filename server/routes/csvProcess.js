const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.GEMINI_KEY);

async function generateDescription(item_name, item_tags) {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const prompt = `Generate a 20 word description based on the following item name and item tags: ${item_name}, ${item_tags}`;
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();
    return text;
}

router.post('/', async (req, res) => {
    const items = req.body;
    const promises = items.map(item =>
        generateDescription(item.item, item.tags).then(description => ({
            ...item,
            description
        }))
    );

    Promise.all(promises)
        .then(results => res.json(results))
        .catch(error => res.status(500).json({ message: 'Error generating descriptions', error }));
});

module.exports = router;

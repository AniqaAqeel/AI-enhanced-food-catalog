const router = require('express').Router();
const cors = require('cors');
const multer = require('multer');
const { ResOwner } = require("../models/resowner");
const { FoodItem } = require('../models/fooditems')
const fs = require('fs');
const csvParser = require('csv-parser');
require('dotenv').config();
const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.GEMINI_KEY);
const mongoose = require('mongoose');
const findUserIdFromToken = require("../utils/findUserIdFromToken");

const uploadDir = 'uploads/';
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Setting up multer for file storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + '.csv');
    }
});

const upload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
        if (file.mimetype !== 'text/csv' && file.mimetype !== 'application/vnd.ms-excel') {
            return router.status(400).json({ message: 'Invalid file format. Please upload a CSV file.' });
        }
        cb(null, true);
    }
});

async function generateDescription(item_name, item_tags) {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const prompt = `Generate a 20 word description based on the following item name and item tags: ${item_name}, ${item_tags}`;
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();
    console.log("Generating description"); // Debugging
    return text;
}

router.post('/', upload.single('file'), async (req, res) => {
    try {
        const token = req.body.token;
        if (!token) {
            return res.status(403).send({ message: 'No authentication token provided.' });
        }
        const userId = findUserIdFromToken(token);
        const resowner = await ResOwner.findById(userId);
        if (!resowner) {
            return res.status(401).send({ message: 'User not authenticated or does not exist.' });
        }

        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        const fileStream = fs.createReadStream(req.file.path);
        const responses = [];
        let errors = [];

        fileStream.pipe(csvParser())
            .on('data', (row) => {
                if (!row.name || !row.tags || !row.price) {
                    errors.push('Invalid CSV file format. Should Include name, tags, price.');
                    return;
                }
                responses.push({
                    name: row.name,
                    tag: row.tags,
                    price: row.price,
                });
            })
            .on('end', async () => {
                if (errors.length > 0) {
                    return res.status(400).json({ message: errors.join(', ') });
                }
                try {
                    // Process your data here (e.g., insert into database)
                    // Uncomment and use if needed: await FoodItem.insertMany(responses);
                    // fs.unlinkSync(req.file.path); // Cleanup the uploaded file
                    res.status(200).json(responses);
                } catch (error) {
                    console.error('Error during processing or database operation:', error);
                    res.status(500).send({ message: 'Internal Server Error' });
                }
            })
            .on('error', (error) => {
                console.error('Error processing the CSV file:', error);
                res.status(500).send({ message: 'Internal Server Error' });
            });
    } catch (error) {
        console.error('Error in file upload or authentication:', error);
        res.status(500).send({ message: 'Internal Server Error' });
    }
});

module.exports = router;
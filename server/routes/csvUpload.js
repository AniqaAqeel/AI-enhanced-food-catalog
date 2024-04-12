const router = require('express').Router();
const cors = require('cors');
const multer = require('multer');
const { ResOwner } = require("../models/resowner")
const fs = require('fs');
const csvParser = require('csv-parser');
require('dotenv').config();
const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.GEMINI_KEY);
const mongoose = require('mongoose');

const uploadDir = 'uploads/';
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true }); // Ensure the directory is created along with any necessary subdirectories
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
const upload = multer({ storage: storage });

async function generateDescription(item_name, item_tags) {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const prompt = `Generate a 20 word description based on the following item name and item tags: ${item_name}, ${item_tags}`;
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();
    console.log("Generating description")
    return text;
}


router.post('/', upload.single('file'), async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }

    const fileStream = fs.createReadStream(req.file.path);
    let promises = []; // Array to hold promises

    fileStream
        .pipe(csvParser())
        .on('data', (row) => {
            // Create a promise for each row and push it to the promises array
            const promise = generateDescription(row.item, row.tags)
                .then(description => {
                    console.log(description); // Debugging
                    return {
                        id: row.id,
                        itemName: row.item,
                        itemPrice: row.price,
                        tags: row.tags,
                        description: description
                    };
                });
            promises.push(promise);
        })
        .on('end', () => {
            // Wait for all promises to resolve
            Promise.all(promises).then(results => {
                fs.unlinkSync(req.file.path); // Cleanup the uploaded file
                res.json(results); // Send the response with all results
            }).catch(error => {
                console.error('Error processing one or more rows:', error);
                res.status(500).json({ message: 'Error processing one or more rows' });
            });
        })
        .on('error', (error) => {
            console.error('Error processing the CSV file:', error);
            res.status(500).json({ message: 'Error processing the file' });
        });
});

module.exports = router;
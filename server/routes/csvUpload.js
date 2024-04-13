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
        const token = req.body.token; // Extract token from Authorization header
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

        // Immediate response after file upload
        //res.status(202).json({ message: 'File uploaded, processing started.' });

        const fileStream = fs.createReadStream(req.file.path);
        const responses = [];


        fileStream.pipe(csvParser())
            .on('data', (row) => {
                // return {
                //     item_name: row.item_name,
                //     item_tags: row.item_tags,
                //     price : row.price,
                // };
                if (!row.name || !row.tags || !row.price) {
                    
                    return res.status(400).json({ message: 'Invalid CSV file format. Should Include name,Tags,price' });
                }
                responses.push(
                    {
                        name: row.name,
                        tag: row.tags,
                        price: row.price,
                    }
                )

                
            })
            .on('end', async () => {
                try {
                    // const items = await Promise.all(promises);
                    // await FoodItem.insertMany(items);
                    // fs.unlinkSync(req.file.path); // Cleanup the uploaded file
                    // console.log('Menu uploaded and stored successfully.');
                    res.status(200).json(responses);
                } catch (error) {
                    //console.error('Error during processing or database operation:', error);
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
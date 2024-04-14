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
async function  generateDescription(item_name, item_tags) {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const prompt = `Generate a 20 word description based on the following item name and item tags: ${item_name}, ${item_tags}`;
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();
    console.log("Generating description"); // Debugging
    return text;
}



router.post('/', async (req, res) => {
    try {
        const token = req.body.token; // Extract token from Authorization header
        console.log(req.body)
        if (!token) {
            return res.status(403).send({ message: 'No authentication token provided.' });
        }
        const userId = findUserIdFromToken(token);
        if (!userId) {
            return res.status(401).send({ message: 'User not authenticated or does not exist.' });
        }

        const resowner = await ResOwner.findById(userId);
        if (!resowner) {
            return res.status(401).send({ message: 'User not authenticated or does not exist.' });
        }
        const item_list = req.body.item_list;
        let promises = [];
        //Generate description for each item in the list
        const item_descriptions = [];
        for (let i = 0; i < item_list.length; i++) {
            const item_name = item_list[i].name;
            const item_tags = item_list[i].tags;
            const id = item_list[i].id;
            const description = generateDescription(item_name, item_tags).then((description) => {
                item_descriptions.push({ id, description });
            }).catch((error) => {
                throw new Error(`Error in promise for item with id ${id}: ${error.message}`);
            });
            promises.push(description);
            if (promises.length === 10 ) {
                try {
                    await Promise.all(promises);
                    promises = []; // Reset the promises array
                } catch (error) {
                    console.error(error);
                    return res.status(400).send({ message: 'Failed to generate description. ' + error });
                }
            }
        }
        try{
            await Promise.all(promises);
            item_descriptions.sort((a, b) => a.id - b.id);
        }
        catch(error){
            console.error(error);
            

            return res.status(400).send({ message: 'Failed to generate description. ' + error });
        }
        return res.status(200).send({ item_descriptions });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: 'Internal server error.' });
    }
})

module.exports = router;
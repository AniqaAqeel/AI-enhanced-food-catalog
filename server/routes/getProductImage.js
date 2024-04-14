const router = require("express").Router();
const { User } = require("../models/user");
const bcrypt = require("bcrypt");
const Joi = require("joi");
const { ResOwner } = require("../models/resowner");
const multer = require("multer");
const { FoodItem } = require("../models/fooditems");
const path = require("path");
const fs = require("fs");
const findUserIdFromToken = require("../utils/findUserIdFromToken");


const image_dir = path.join(__dirname, "../src/products/");


router.get("/", async (req, res) => {
    const token = req.query.token;
    if (!token) {
        return res.status(403).send({ message: 'No authentication token provided.' });
    }
    const userId = findUserIdFromToken(token);
    if (!userId) {
        return res.status(401).send({ message: 'User not authenticated or does not exist.' });
    }
    const product_id = req.query.product_id;
    const product = await FoodItem.findOne({ "_id": product_id });
    if (!product) {
        return res.status(404).send({ message: 'Product not found.' });
    }
    const files = await fs.promises.readdir(image_dir)
    const productFile = files.find(file => file.startsWith(product_id));
    if (productFile) {
        const filePath = path.join(image_dir, productFile);
        const image = fs.readFileSync(filePath);
        res.writeHead(200, { 'Content-Type': 'image/png' });
        res.end(image, 'binary');
    }
    else {
        return res.status(404).send({ message: 'Image not found.' });
    }
}
);

module.exports = router;

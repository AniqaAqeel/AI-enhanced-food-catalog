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
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, image_dir);
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now();
      cb(null, "temp_" + file.originalname);
    },
  });
  
  const upload = multer({ storage: storage });

  router.post("/", (req, res, next) => {
    upload.single("image")(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        // A Multer error occurred when uploading.
        return res.status(500).json({ error: "Multer error: " + err.message });
      } else if (err) {
        // An unknown error occurred.
        return res.status(500).json({ error: "Unknown error: " + err.message });
      }
      next();
    });
  }, async (req, res) => {
    try {
        const token = req.body.token; // Extract token from Authorization header
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
        const product_id = req.body.product_id;
        //Find the product with the given id where the resowner is the owner
        const product = await FoodItem.findOne({ "_id": product_id, "resowner": userId });
        if (!product) {
            return res.status(404).send({ message: 'Product not found.' });
        }
        const files = await fs.promises.readdir(image_dir)
    const tempFile = files.find(file => file.startsWith("temp_"));
        if (tempFile) {
            const oldFilePath = path.join(image_dir, tempFile);
            const newFileName = product_id;
            const newFilePath = path.join(image_dir, newFileName);
            await fs.promises.rename(oldFilePath, newFilePath);
            
            product.imageLink = newFileName;
            await product.save();
            return res.status(200).send({ message: 'Image uploaded successfully.' });
        } else {
            return res.status(400).send({ message: 'No image uploaded.' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: 'Internal server error.' });
    }
    }
    );
module.exports = router;

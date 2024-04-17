const router = require("express").Router();
const bcrypt = require("bcrypt");
const { User } = require("../models/user");
const { Restaurant, validateRestaurant } = require("../models/restaurant");
const Joi = require("joi");
const findUserIdFromToken = require("../utils/findUserIdFromToken")
const path = require("path");
const fs = require('fs');

const image_dir = path.join(__dirname, "../src/images/");


router.get("/", async (req, res) => {
    try {
        const token = req.query.token;
        if (!token) 
            return res.status(403).send({ message: "No authentication token provided" })

        const userId = findUserIdFromToken(token);

        if (!userId) {
            return res.status(401).send({ message: "Unauthorized" });
        }
        const res_owner = req.query.res_owner;
        const files = await fs.promises.readdir(image_dir)
        const fileName = files.find(file => file.startsWith(res_owner));

    if (!fileName) return res.status(404).send({ message: "No image found" });

    const image = await fs.promises.readFile(path.join(image_dir, fileName));
    res.set("Content-Type", "image/*");
    res.send(image);
    } catch (error) {
        console.log(error)
        res.status(500).send({ message: "Internal Server Error" });
    }
});

module.exports = router;
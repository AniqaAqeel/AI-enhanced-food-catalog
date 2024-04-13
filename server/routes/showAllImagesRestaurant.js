const router = require("express").Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const findUserIdFromToken = require("../utils/findUserIdFromToken");
const { ResOwner } = require("../models/resowner");

const image_dir = path.join(__dirname, "../src/images/");

router.get("/", async (req, res) => {
  try {
    const token = req.query.token;
    const userId = findUserIdFromToken(token);

    const resowner = await ResOwner.findOne({ _id: userId });

    if (!resowner)
      return res.status(401).send({ message: "User not logged in" });

    const files = await fs.promises.readdir(image_dir);
    const fileName = files.find((file) => file.startsWith(userId));

    if (!fileName) return res.status(404).send({ message: "No image found" });

    const image = await fs.promises.readFile(path.join(image_dir, fileName));
    res.set("Content-Type", "image/*");
    res.send(image);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

module.exports = router;
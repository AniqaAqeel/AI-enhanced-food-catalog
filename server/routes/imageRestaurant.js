const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require('fs');
const findUserIdFromToken = require("../utils/findUserIdFromToken")
const { ResOwner } = require("../models/resowner");
// const Images = require("./models/Images");

const router = express.Router();
const image_dir = path.join(__dirname, "../src/images/")

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, image_dir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    // console.log(imageName.split('.').pop())
    cb(null, "temp_" + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post("/", upload.single("image"), async (req, res) => {
  const imageName = req.file.filename;
  try {
    const token = req.body.token;
    const userId = findUserIdFromToken(token);

    const resowner = await ResOwner.findOne({ "_id": userId })
    
    if (!resowner) 
        return res.status(401).send({ message: "User not logged in" });

    const files = await fs.promises.readdir(image_dir)
    const tempFile = files.find(file => file.startsWith("temp_"));

    if (tempFile) {
        const oldFilePath = path.join(image_dir, tempFile);
        const newFileName = userId;
        const newFilePath = path.join(image_dir, (newFileName + "." + imageName.split('.').pop()));

        await fs.promises.rename(oldFilePath, newFilePath);

        const image = await fs.promises.readFile(newFilePath);
        res.set('Content-Type', 'image/*'); 
        res.send(image);
    } else {
      res.status(404).send({ message: "Image not found" });
    }

    // res.json({ status: "ok" });
  } catch (error) {
    res.json({ status: error });
  }
});

module.exports = router;
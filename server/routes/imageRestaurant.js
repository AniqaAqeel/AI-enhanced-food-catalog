const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require('fs');
const findUserIdFromToken = require("../utils/findUserIdFromToken")
const { ResOwner } = require("../models/resowner");

const router = express.Router();
const image_dir = path.join(__dirname, "../src/images/");

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
    if (!req.file) {
      return res.status(400).json({ message: "No image uploaded" });
    }

    const imageName = req.file.filename;
    const extension = path.extname(imageName);
    if (![".png", ".jpg", ".jpeg",".webp"].includes(extension)) {
      return res.status(400).json({ message: "Invalid image format" });
    }
    const token = req.body.token;
    const userId = findUserIdFromToken(token);

    const resowner = await ResOwner.findOne({ "_id": userId });
    
    if (!resowner) {
      return res.status(401).json({ message: "User not logged in" });
    }

    const files = await fs.promises.readdir(image_dir)
    const tempFile = files.find(file => file.startsWith("temp_"));

    if (tempFile) {
      const oldFilePath = path.join(image_dir, tempFile);
      const newFileName = userId;
      const newFilePath = path.join(image_dir, (newFileName));

      await fs.promises.rename(oldFilePath, newFilePath);

      // const image = await fs.promises.readFile(newFilePath);
      // res.set('Content-Type', 'image/*'); 
      // res.send(image);
      res.status(200).json({ message: "Image uploaded successfully" });
    } else {
      res.status(404).json({ message: "Image not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
const router = require('express').Router();
const multer = require('multer');
const { ResOwner } = require("../models/resowner")
const fs = require('fs');
const csvParser = require('csv-parser');

const uploadDir = 'uploads/';
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + '.csv');
    }
});
const upload = multer({ storage: storage });

router.post('/', upload.single('file'), async (req, res) => {
    // const token = req.body.token;
    // const userId = findUserIdFromToken(token);

    // const resowner = await ResOwner.findOne({ "_id": userId })
    
    // if (!resowner) 
    //     return res.status(401).send({ message: "User not logged in" });

    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }

    const filePath = req.file.path;
    const results = [];
    fs.createReadStream(filePath)
        .pipe(csvParser())
        .on('data', (data) => results.push(data))
        .on('end', () => {
            fs.unlinkSync(filePath); // Optionally remove the file after parsing
            res.json(results);
        });
});

module.exports = router;

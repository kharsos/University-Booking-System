const express = require('express');
const app = express();
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, '../uploads/');
    },
    filename: function(req, file, cb) { 
        cb(null, file.originalname);
    }
});

const upload = multer({ storage });

app.post('/uploads', upload.single('file'), (req, res) => {
    res.json(req.file);
});

app.listen(5000, () => {
    console.log('app is listening');
});

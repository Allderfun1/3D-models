import express from 'express';
import multer from 'multer';
import cors from 'cors';
import path from 'path';
import fs from 'fs';

const directoryPath = './uploads/';

fs.readdirSync(directoryPath).forEach((file) => {
    const filePath = path.join(directoryPath, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
        rmdirRecursive(filePath);
    } else if (stat.isFile()) {
        fs.unlinkSync(filePath);
    }
});

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, directoryPath);
    },
    filename: function (req, file, cb) {
        const uniqueName = `${Date.now()}-${file.originalname}`;
        cb(null, uniqueName);
    }
});

const upload = multer({ storage: storage }).single('file');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post('/upload', (req, res) => {
    upload(req, res, function (err) {
        if (err) {
            return res.end("Error uploading file.");
        }
        res.json({ fileName: req.file.filename });
    });
});

app.post('/delete', (req, res) => {
    const filePath = `uploads/${req.body.fileName}`;
    if (!filePath) {
        return res.status(400).send('No file path provided');
    }

    try {
        fs.unlinkSync(filePath);
        res.status(200).send(`File ${path.basename(filePath)} deleted`);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error deleting file');
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
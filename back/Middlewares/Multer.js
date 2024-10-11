const multer = require('multer');
const path = require('path');
const fs = require('fs');

const uploadDir = './public/uploads';

if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, {recursive: true});
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const upload = multer({
    storage: storage,
    limits: {fileSize: 2 * 1024 * 1024},
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

        if (!mimetype || !extname) {
            return cb(new Error('Seul les fichiers images sont autorisés'));
        } else {
            return cb(null, true);
        }
    }
});

module.exports = upload;
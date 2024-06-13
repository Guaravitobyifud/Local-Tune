const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../uploads'));
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + '-' + file.originalname);
    }
});

const imageFileFilter = (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error: Arquivos de imagem apenas!');
    }
};

const videoFileFilter = (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif|mp4|mov|avi|wmv/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error: Arquivos de imagem ou vídeo apenas!');
    }
};

const multerConfig = multer({
    storage: storage,
    fileFilter: imageFileFilter,
    limits: { fileSize: 10 * 1024 * 1024 } // Limite de 10MB por arquivo
});

const multerConfig2 = multer({
    storage: storage,
    fileFilter: videoFileFilter,
    limits: { fileSize: 10 * 1024 * 1024 } // Limite de 10MB por arquivo
});

module.exports = { multerConfig, multerConfig2 };

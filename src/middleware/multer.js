// middleware/multer.js
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Certifique-se de que o diretório de upload existe
const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Configuração do armazenamento de arquivos
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

// Configuração do filtro de tipos de arquivo
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('O arquivo enviado não é uma imagem.'), false);
    }
};

// Configuração do Multer
const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 500 * 1024 * 1024 // Limite de 500MB para o tamanho do arquivo
    }
});

module.exports = upload;

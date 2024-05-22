const multer = require('multer');

function filtroDeImgs(req, file, cb) {
    if (file.mimetype.starWith('image')){
        cb(null, true)
    }
    
    else{
        cb('Por favor, apenas faça upload de imgs!', false)
    }
}

const armazenar_Multer = multer.diskStorage({
    destination: (re, file, cb) =>{
        const pathDestino = __basedir = 
        "/resourcers/fotosPerfil/temporarias"
        cb(null, pathDestino)
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_fotoPerfil_${file.originalname}`)
    }
})

const uploadMiddleware = multer({
    storage: armazenar_Multer,
    fileFilter: filtroDeImgs
})
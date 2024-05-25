const express = require('express');
const router = express.Router();
const authlogin = require('../controllers/Controllerlogin');
const authcadastro = require('../controllers/Controllercadastro');
const pesquisa = require('../controllers/ControllerPesquisa');
const authUpload = require('../controllers/controllerIMG');
const upload = require('../middleware/multer');

router.post("/login", authlogin.login);
router.post("/cadastrouser", authcadastro.cadastroUsuario);
router.post("/cadastromusic", authcadastro.cadastroMusico);
router.post("/cadastrostbl", authcadastro.cadastroStbl);
router.post("/Search", pesquisa.Pesquisa);
router.post("/uploadimg", upload.single('imagem'), authUpload.uploadFotoPerfil);

module.exports = router;
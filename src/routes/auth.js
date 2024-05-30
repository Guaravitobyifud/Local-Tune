const express = require('express');
const router = express.Router();
const authlogin = require('../controllers/Controllerlogin');
const authcadastro = require('../controllers/Controllercadastro');
const pesquisa = require('../controllers/ControllerPesquisa');
const authUpload = require('../controllers/controllerIMG');
const upload = require('../middleware/multer');

const multer = require('multer');

const multerConfig = require('../middleware/multer');

router.post("/login", authlogin.login);
router.post("/cadastrouser", authcadastro.cadastroUsuario);
router.post("/cadastromusic", authcadastro.cadastroMusico);
router.post("/cadastrostbl", authcadastro.cadastroStbl);
router.post("/Search", pesquisa.Pesquisa);
router.post("/uploadimg", upload.single('imagem'), authUpload.uploadFotoPerfil);

router.post("/alterarFotoPerfil", multer(multerConfig).single('imagem'), async (req, res, next) => {
    try {
        // Atualiza a sessão com a nova imagem do perfil
        req.session.dadosUsuario.nm_imagem = req.file.filename;

        // Chama a função para alterar a foto de perfil após o upload ser processado
        await authUpload.alterarFotoPerfil(req, res);

    } catch (erro) {
        console.error("Erro ao tentar alterar a foto de Perfil:", erro);
        res.send(`Erro ao tentar alterar a foto de Perfil: ${erro}`);
    }
});

module.exports = router;
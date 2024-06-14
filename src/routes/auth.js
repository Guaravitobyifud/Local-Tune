const express = require('express');
const router = express.Router();
const multer = require('multer');
const { multerConfig, multerConfig2 } = require('../middleware/multer');
const PubliController = require('../controllers/controllerPost');

const authlogin = require('../controllers/Controllerlogin');
const authcadastro = require('../controllers/Controllercadastro');
const pesquisa = require('../controllers/ControllerPesquisa');
const uploadController = require('../controllers/controllerIMG');

// Rota para login
router.post("/login", authlogin.login);

// Rota para cadastro de usuário
router.post("/cadastrouser", authcadastro.cadastroUsuario);

// Rota para cadastro de músico
router.post("/cadastromusic", authcadastro.cadastroMusico);

// Rota para cadastro na tabela
router.post("/cadastrostbl", authcadastro.cadastroStbl);

// Rota para pesquisa
router.post("/Search", pesquisa.Pesquisa);

// Rota para upload de imagem
router.post("/uploadimg", multer(multerConfig).single('imagem'), uploadController.uploadFotoPerfil);

// Rota para alterar a foto do perfil
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

router.post("/uploadFotoPerfil", multer(multerConfig).single('file'), async (req, res, next) => {
    try {
        console.log("Dados da sessão no início do upload:", req.session.dadosUsuario);

        await uploadController.uploadFotoPerfil(req, res);

        console.log("Dados da sessão após upload:", req.session.dadosUsuario);
    } catch (erro) {
        console.error("Erro ao tentar fazer upload da foto de Perfil:", erro);
        res.send(`Erro ao tentar fazer upload da foto de Perfil: ${erro}`);
    }
});

router.post("/alteraFotoPerfil", multer(multerConfig).single('file'), async (req, res, next) => {
    try {
        console.log("Dados da sessão no início do upload:", req.session.dadosUsuario);

        await uploadController.alterarFotoPerfil(req, res);

        console.log("Dados da sessão após upload:", req.session.dadosUsuario);
    } catch (erro) {
        console.error("Erro ao tentar fazer upload da foto de Perfil:", erro);
        res.send(`Erro ao tentar fazer upload da foto de Perfil: ${erro}`);
    }
});

router.post('/uploadArquivos', multer(multerConfig2).array('files', 5), PubliController.uploadArquivos);

module.exports = router;

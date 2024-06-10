const express = require('express');
const router = express.Router();
const multer = require('multer');
const multerConfig = require('../middleware/multer');
const multerConfig2 = require('../middleware/multer');
const { tb_usuario } = require('../models/modeloUsuario');
const { tb_img } = require('../models/modeloIMG');
const uploadController = require('../controllers/ControllerIMG');
const session = require('express-session');
const PubliController = require('../controllers/controllerPost.js');

// Middleware para verificar a autenticação do usuário
function userAuth(req, res, next) {
    if (req.session && req.session.dadosUsuario) {
        next(); // Continua para o próximo middleware
    } else {
        res.render('index', { message: 'Por favor, faça login' }); // Renderiza a página inicial com uma mensagem de erro
    }
}

router.get("/login", (req, res) => {
    if (req.session && req.session.dadosUsuario) {
        res.render('homeUsu', { 
            username: 'Bem-vindo ' + req.session.dadosUsuario.nm_usuario,
            profilePicture: `/imagem/${req.session.dadosUsuario.cd_usuario}`, // Passa a URL da imagem
            logout: '<h3><a class="bo" href="/logout">logout</a></h3>' 
        });
    } else {
        res.render('login');
    }
});

router.get("/cadastro", (req, res) => {
    res.render("cadastro");
});

router.get("/cadastroMusico", (req, res) => {
    res.render("cadastroMusico");
});

router.get("/Search", (req, res) => {
    res.render("Search");
});

router.get("/homeUsu", userAuth, async (req, res) => {
    if (req.session && req.session.dadosUsuario) {
        try {
            const usuario = await tb_usuario.findOne({ where: { cd_usuario: req.session.dadosUsuario.cd_usuario } });
            const img = await tb_img.findOne({ where: { cd_user: req.session.dadosUsuario.cd_usuario } });
            
            if (usuario) {
                res.render('homeUsu', { 
                    username: 'Bem-vindo ' + usuario.nm_usuario,
                    profilePicture: img ? `/imagem/${req.session.dadosUsuario.cd_usuario}` : null, // Passa a URL para a imagem
                    logout: '<h3><a class="bo" href="/logout">logout</a></h3>' 
                });
            } else {
                res.redirect('/login');
            }
        } catch (error) {
            console.error('Erro ao buscar usuário:', error);
            res.redirect('/login');
        }
    } else {
        res.redirect('/login');
    }
});

router.post("/posts", multer(multerConfig).single('file'), async (req, res) => {
    console.log(req.file);
    // O trecho comentado abaixo foi removido para evitar confusões, já que não é necessário para este exemplo.
    // const imgs = req.files.map(file => ({ img: file.path }));
});

router.get("/cadastroSTBL", (req, res) => {
    res.render("cadastroSTBL");
});

router.get("/", (req, res) => {
    res.render("index");
});

router.get("/logout", function (req, res) {
    req.session.destroy(function(err) {
        if (err) {
            console.log(err);
        } else {
            res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, private');
            res.redirect('/login');
        }
    });
});

router.get("/uploadimg", (req, res) => {
    res.render('uploadimg');
});

// Adiciona a rota para o controlador de upload
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

router.post('/uploadArquivos', (multerConfig2).array('files', 5), PubliController.uploadArquivos);


// Rota para servir as imagens do banco de dados
router.get("/imagem/:cd_usuario", uploadController.getFotoPerfil);

module.exports = router
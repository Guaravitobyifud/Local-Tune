const express = require('express');
const router = express.Router();
const multer = require('multer');
const multerConfig = require('../middleware/multer');
const { tb_usuario } = require('../models/modeloUsuario');
const uploadController = require('../controllers/ControllerIMG');
const session = require('express-session');

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
            profilePicture: req.session.dadosUsuario.cd_usuario, // Passa o ID do usuário para gerar a URL da imagem
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
            if (usuario) {
                res.render('homeUsu', { 
                    username: 'Bem-vindo ' + usuario.nm_usuario,
                    profilePicture: usuario.cd_usuario, // Passa o ID do usuário para gerar a URL da imagem
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

        // Atualiza a sessão com a nova imagem do perfil
        req.session.dadosUsuario.nm_imagem = req.file.filename;
        console.log("Dados da sessão após upload:", req.session.dadosUsuario);

        res.redirect('/homeUsu');
    } catch (erro) {
        console.error("Erro ao tentar fazer upload da foto de Perfil:", erro);
        res.send(`Erro ao tentar fazer upload da foto de Perfil: ${erro}`);
    }
});

// Rota para servir as imagens do banco de dados
router.get("/imagem/:cd_usuario", uploadController.getFotoPerfil);

// Adiciona a rota para o controlador de alterar foto de perfil


module.exports = router;
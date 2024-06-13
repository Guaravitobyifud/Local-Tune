const express = require('express');
const router = express.Router();
const multer = require('multer')
const { multerConfig, multerConfig2 } = require('../middleware/multer');
const uploadController = require('../controllers/ControllerIMG');
const PubliController = require('../controllers/controllerPost');
const {tb_usuario} = require('../models/modeloUsuario')
const {tb_img} = require('../models/modeloIMG')
const {tb_publicacao} = require('../models/modeloPubli')
const {tb_publicacao_arquivos} = require('../models/modeloPubliArquivos')

// Middleware para verificar a autenticação do usuário
function userAuth(req, res, next) {
    if (req.session && req.session.dadosUsuario) {
        next();
    } else {
        res.render('index', { message: 'Por favor, faça login' });
    }
}

router.get("/login", (req, res) => {
    if (req.session && req.session.dadosUsuario) {
        res.render('homeUsu', {
            username: 'Bem-vindo ' + req.session.dadosUsuario.nm_usuario,
            profilePicture: `/imagem/${req.session.dadosUsuario.cd_usuario}`,
            logout: '<h3><a class="bo" href="/logout">logout</a></h3>'
        });
    } else {
        res.render('login');
    }
});

router.get("/cadastro", (req, res) => res.render("cadastro"));
router.get("/cadastroMusico", (req, res) => res.render("cadastroMusico"));
router.get("/Search", (req, res) => res.render("Search"));

router.get("/homeUsu", userAuth, async (req, res) => {
    if (req.session && req.session.dadosUsuario) {
        try {
            const usuario = await tb_usuario.findOne({ where: { cd_usuario: req.session.dadosUsuario.cd_usuario } });
            const img = await tb_img.findOne({ where: { cd_user: req.session.dadosUsuario.cd_usuario } });

            const publicacoesComTipo = await tb_publicacao.findAll({
                include: [{
                    model: tb_publicacao_arquivos,
                    as: 'tb_publicacao_arquivos'
                }],
                where: { cd_usuario: req.session.dadosUsuario.cd_usuario }
            });

            const publicacoesComTipoEArquivos = publicacoesComTipo.map(publi => {
                const arquivosComTipo = publi.tb_publicacao_arquivos.map(arquivo => {
                    const base64Data = Buffer.from(arquivo.arquivos).toString('base64');
                    if (arquivo.tipo_arquivo.startsWith('image/')) {
                        return { ...arquivo.toJSON(), tipo: 'image', base64Data };
                    } else if (arquivo.tipo_arquivo.startsWith('video/')) {
                        return { ...arquivo.toJSON(), tipo: 'video', base64Data };
                    } else {
                        return { ...arquivo.toJSON(), tipo: 'unknown', base64Data };
                    }
                });

                return {
                    ...publi.toJSON(),
                    tb_publicacao_arquivos: arquivosComTipo
                };
            });

            res.render('homeUsu', {
                username: 'Bem-vindo ' + usuario.nm_usuario,
                profilePicture: img ? `/imagem/${req.session.dadosUsuario.cd_usuario}` : null,
                logout: '<h3><a class="bo" href="/logout">logout</a></h3>',
                publicacoes: publicacoesComTipoEArquivos
            });
        } catch (error) {
            console.error('Erro ao buscar usuário ou publicações:', error);
            res.redirect('/login');
        }
    } else {
        res.redirect('/login');
    }
});

module.exports = router;

router.post("/posts", multer(multerConfig).single('file'), async (req, res) => {
    console.log(req.file);
    // Processamento do arquivo enviado
});

router.get("/cadastroSTBL", (req, res) => res.render("cadastroSTBL"));
router.get("/", (req, res) => res.render("index"));

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

router.get("/uploadimg", (req, res) => res.render('uploadimg'));



// Rota para servir as imagens do banco de dados
router.get("/imagem/:cd_usuario", uploadController.getFotoPerfil);



router.get('/publicacoes/:cd_publicacao', PubliController.getPublicacoes);


module.exports = router;

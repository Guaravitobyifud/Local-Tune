const express = require('express');
const router = express.Router();
const multer = require('multer');
const { multerConfig } = require('../middleware/multer');
const uploadController = require('../controllers/ControllerIMG');
const PubliController = require('../controllers/controllerPost');
const { tb_usuario } = require('../models/modeloUsuario');
const { tb_img } = require('../models/modeloIMG');
const { tb_publicacao } = require('../models/modeloPubli');
const { tb_publicacao_arquivos } = require('../models/modeloPubliArquivos');
const { Model, Op, Sequelize } = require('sequelize')
const { connSequelize } = require('../../config/coneccao')


// Middleware para verificar a autenticação do usuário
function userAuth(req, res, next) {
    if (req.session && req.session.dadosUsuario) {
        next();
    } else {
        res.render('login');
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
                    const dataUri = `data:${arquivo.tipo_arquivo};base64,${base64Data}`;
                    if (arquivo.tipo_arquivo.startsWith('image/')) {
                        return { ...arquivo.toJSON(), tipo: 'image', dataUri };
                    } else if (arquivo.tipo_arquivo.startsWith('video/')) {
                        return { ...arquivo.toJSON(), tipo: 'video', dataUri };
                    } else {
                        return { ...arquivo.toJSON(), tipo: 'unknown', dataUri };
                    }
                });

                return {
                    ...publi.toJSON(),
                    tb_publicacao_arquivos: arquivosComTipo
                };
            });

            res.render('homeUsu', {
                username: 'Bem-vindo ' + usuario.nm_usuario,
                profilePicture: img ? (await getFotoPerfilUri(req.session.dadosUsuario.cd_usuario)) : null,
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

// Função auxiliar para obter a URI da imagem do perfil
async function getFotoPerfilUri(cd_usuario) {
    const img = await tb_img.findOne({ where: { cd_user: cd_usuario } });
    if (img) {
        const base64Data = Buffer.from(img.img).toString('base64');
        return `data:${img.tipo};base64,${base64Data}`;
    }
    return null;
}


router.post("/posts", multer(multerConfig).single('file'), async (req, res) => {
    console.log(req.file);
    // Processamento do arquivo enviado
});


router.get("/cadastroSTBL", (req, res) => res.render("cadastroSTBL"));

async function getFotoPerfilUri(cd_usuario) {
    const img = await tb_img.findOne({ where: { cd_user: cd_usuario } });
    if (img) {
        const base64Data = Buffer.from(img.img).toString('base64');
        return `data:${img.tipo};base64,${base64Data}`;
    }
    return null;
}
router.get("/", async (req, res) => {
    try {
        const publicacoes = await tb_publicacao.findAll({
            order: connSequelize.random(), // Use sequelize.random() para MySQL ou Sequelize.fn('RANDOM') para SQLite/Postgres
            limit: 10,
            include: [
                {
                    model: tb_usuario,
                    as: 'usuario',
                    attributes: ['nm_usuario', 'cd_usuario']
                },
                {
                    model: tb_publicacao_arquivos,
                    as: 'tb_publicacao_arquivos'
                }
            ]
        });

        const publicacoesComTipoEArquivos = await Promise.all(publicacoes.map(async (publi) => {
            const arquivosComTipo = publi.tb_publicacao_arquivos.map(arquivo => {
                const base64Data = Buffer.from(arquivo.arquivos).toString('base64');
                const dataUri = `data:${arquivo.tipo_arquivo};base64,${base64Data}`;
                if (arquivo.tipo_arquivo.startsWith('image/')) {
                    return { ...arquivo.toJSON(), tipo: 'image', dataUri };
                } else if (arquivo.tipo_arquivo.startsWith('video/')) {
                    return { ...arquivo.toJSON(), tipo: 'video', dataUri };
                } else {
                    return { ...arquivo.toJSON(), tipo: 'unknown', dataUri };
                }
            });

            const fotoPerfilUri = await getFotoPerfilUri(publi.usuario.cd_usuario);
            return {
                ...publi.toJSON(),
                tb_publicacao_arquivos: arquivosComTipo,
                usuario: {
                    ...publi.usuario.toJSON(),
                    fotoPerfilUri
                }
            };
        }));

        res.render('index', { publicacoes: publicacoesComTipoEArquivos });
    } catch (error) {
        console.error('Erro ao buscar publicações aleatórias:', error);
        res.status(500).send('Erro ao buscar publicações aleatórias');
    }
});

router.get("/uploadimg", (req, res) => res.render('uploadimg'));

// Rota para servir as imagens do banco de dados
router.get("/imagem/:cd_usuario", uploadController.getFotoPerfil);

// Rotas para publicações
router.get('/publicacoes/:cd_usuario', PubliController.getPublicacoes);

router.get('/publicacao/:cd_publicacao', async (req, res) => {
    try {
        const cd_publicacao = req.params.cd_publicacao;

        const publicacao = await tb_publicacao.findOne({
            where: { cd_publicacao },
            include: [{
                model: tb_publicacao_arquivos,
                as: 'tb_publicacao_arquivos'
            }]
        });

        if (!publicacao) {
            return res.status(404).send('Publicação não encontrada');
        }

        const arquivosComTipoEDataUri = publicacao.tb_publicacao_arquivos.map(arquivo => {
            const base64Data = Buffer.from(arquivo.arquivos).toString('base64');
            const dataUri = `data:${arquivo.tipo_arquivo};base64,${base64Data}`;

            if (arquivo.tipo_arquivo.startsWith('image/')) {
                return { ...arquivo.toJSON(), tipo: 'image', dataUri };
            } else if (arquivo.tipo_arquivo.startsWith('video/')) {
                return { ...arquivo.toJSON(), tipo: 'video', dataUri };
            } else {
                return { ...arquivo.toJSON(), tipo: 'unknown', dataUri };
            }
        });

        const publicacaoCompleta = {
            ...publicacao.toJSON(),
            tb_publicacao_arquivos: arquivosComTipoEDataUri
        };

        res.render('publicacaoCompleta', { publicacao: publicacaoCompleta });
    } catch (error) {
        console.error('Erro ao buscar a publicação completa:', error);
        res.status(500).send('Erro ao buscar a publicação completa');
    }
});
module.exports = router;

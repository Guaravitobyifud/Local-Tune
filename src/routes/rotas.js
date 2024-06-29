const express = require('express');
const router = express.Router();
const multer = require('multer');
const { multerConfig, multerConfig2 } = require('../middleware/multer');
const uploadController = require('../controllers/ControllerIMG');
const PubliController = require('../controllers/controllerPost');
const { tb_usuario } = require('../models/modeloUsuario');
const { tb_img } = require('../models/modeloIMG');
const { tb_publicacao } = require('../models/modeloPubli');
const { tb_publicacao_arquivos } = require('../models/modeloPubliArquivos');
const { Model, Op, Sequelize } = require('sequelize')
const { connSequelize } = require('../../config/coneccao')
const { tb_curtida } = require('../models/modeloCurtida');
const { tb_seguindoSeguidor } = require('../models/modeloSeguindoSeguidor');
const session = require('express-session');

const pesquisa = require('../controllers/ControllerPesquisa');
router.post("/pesquisa", pesquisa.Pesquisa);

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
        res.get('/homeUsu');
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
                username: usuario.nm_usuario,
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

router.get("/PerfilUsu/:cd_usuario", async (req, res) => {
    try {
        const usuario = await tb_usuario.findOne({ where: { cd_usuario: req.params.cd_usuario } });
        const img = await tb_img.findOne({ where: { cd_user: req.params.cd_usuario } });

        const publicacoesComTipo = await tb_publicacao.findAll({
            include: [{
                model: tb_publicacao_arquivos,
                as: 'tb_publicacao_arquivos'
            }],
            where: { cd_usuario: req.params.cd_usuario }
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

        res.render('PerfilUsu', {
            username: usuario.nm_usuario,
            profilePicture: img ? (await getFotoPerfilUri(req.params.cd_usuario)) : null,
            logout: '<h3><a class="bo" href="/logout">logout</a></h3>',
            publicacoes: publicacoesComTipoEArquivos
        });
    } catch (error) {
        console.error('Erro ao buscar usuário ou publicações:', error);
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


router.get("/cadastroSTBL",  (req, res) => res.render("cadastroSTBL"));

router.get("/feed_user", userAuth, async (req, res) => {
    try {
        if (req.session && req.session.dadosUsuario && req.session.dadosUsuario.nm_cidade) {
            const usuarioId = req.session.dadosUsuario.cd_usuario;

            const img = await tb_img.findOne({ where: { cd_user: usuarioId } });

            const publicacoes = await tb_publicacao.findAll({
                include: [
                    {
                        model: tb_usuario,
                        as: 'usuario',
                        attributes: ['nm_usuario', 'cd_usuario', 'nm_cidade'],
                        where: { nm_cidade: req.session.dadosUsuario.nm_cidade }
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

                const curtida = await tb_curtida.findOne({ where: { cd_usuario: usuarioId, cd_publicacao: publi.cd_publicacao } });
                const seguido = await tb_seguindoSeguidor.findOne({ where: { cd_seguidor: usuarioId, cd_seguindo: publi.usuario.cd_usuario } });

                return {
                    ...publi.toJSON(),
                    curtido: !!curtida,
                    seguido: !!seguido,
                    tb_publicacao_arquivos: arquivosComTipo,
                    usuarioId: usuarioId
                };
            }));

            res.render("feed_user", {
                publicacoes: publicacoesComTipoEArquivos,
                usuarioId: usuarioId,
                img: img ? img.cd_img : null
            });
        } else {
            res.redirect("/login");
        }
    } catch (error) {
        console.error("Erro ao carregar o feed do usuário:", error);
        res.status(500).send("Erro interno do servidor.");
    }
});




router.get("/", async (req, res) => {

try {
    if (req.session && req.session.dadosUsuario) {
        return res.redirect('feed_user');
    }

    const publicacoes = await tb_publicacao.findAll({
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
        const arquivosComTipoEDataUri = publi.tb_publicacao_arquivos.map(arquivo => {
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
            tb_publicacao_arquivos: arquivosComTipoEDataUri,
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

router.post('/curtir/:cd_publicacao', async (req, res) => {
    const cd_publicacao = req.params.cd_publicacao;
    const cd_usuario = req.session.dadosUsuario.cd_usuario;

    try {
        // Verifica se já existe uma curtida para evitar inserções duplicadas
        const curtidaExistente = await tb_curtida.findOne({
            where: {
                cd_publicacao,
                cd_usuario
            }
        });

        if (curtidaExistente) {
            await curtidaExistente.destroy();
            res.json({ message: 'Curtida removida', action: 'unlike' });
        } else {
            await tb_curtida.create({
                cd_usuario: cd_usuario,
                cd_publicacao: cd_publicacao
            });
            res.json({ message: 'Curtida adicionada', action: 'like' });
        }
    } catch (error) {
        console.error('Erro ao curtir/descurtir a publicação:', error);
        res.status(500).json({ message: 'Erro ao curtir/descurtir a publicação' });
    }
});

router.post('/seguir/:cd_usuario', userAuth, async (req, res) => {
    try {
        const seguidorId = req.session.dadosUsuario.cd_usuario;
        const seguindoId = req.params.cd_usuario;

        const seguir = await tb_seguindoSeguidor.findOne({
            where: { cd_seguidor: seguidorId, cd_seguindo: seguindoId }
        });

        if (seguir) {
            // Se já segue, desfazer
            await tb_seguindoSeguidor.destroy({
                where: { cd_seguidor: seguidorId, cd_seguindo: seguindoId }
            });
            res.json({ action: 'unfollow' });
        } else {
            // Se não segue, começar a seguir
            await tb_seguindoSeguidor.create({
                cd_seguidor: seguidorId,
                cd_seguindo: seguindoId
            });
            res.json({ action: 'follow' });
        }
    } catch (error) {
        console.error('Erro ao seguir/desseguir o usuário:', error);
        res.status(500).json({ error: 'Erro ao seguir/desseguir o usuário.' });
    }
});


module.exports = router;

router.get('/logout', async (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Erro ao destruir a sessão:', err);
            return res.status(500).send('Erro ao fazer logout');
        }
        res.redirect('/');
    });
});
module.exports = router;

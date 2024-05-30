const { tb_img } = require('../models/modeloIMG.js');
const { tb_usuario } = require('../models/modeloUsuario.js');

module.exports = {
    homeUsuario: async (req, res) => {
        try {
            const cd_usuario = req.session.cd_usuario;

            // Buscar dados do usuário
            const usuario = await tb_usuario.findOne({ where: { cd_usuario } });

            // Buscar imagem de perfil do usuário
            const imagem = await tb_img.findOne({ where: { cd_user: cd_usuario } });

            res.render('homeUsu', {
                usuario,
                imagemUrl: imagem ? `/image/${cd_usuario}` : null
            });
        } catch (erro) {
            console.log(erro);
            res.status(500).send('Erro ao carregar a página do usuário');
        }
    }
};

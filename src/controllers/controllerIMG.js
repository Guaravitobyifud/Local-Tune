const { tb_img } = require('../models/modeloIMG.js');
const { tb_usuario } = require('../models/modeloUsuario.js');
const fs = require('fs');
const path = require('path');

module.exports = {
    uploadFotoPerfil: async (req, resp) => {
        const MENSAGENS = {
            NO_FILE_FOUND: 'Você deve selecionar um arquivo! Não havia nenhum!',
            FILE_FOUND: 'Arquivo encontrado no corpo da Requisição:',
            UPLOAD_SUCCEEDED: 'Upload de imagem realizado com sucesso.'
        };

        try {
            if (!req.file) return resp.send(MENSAGENS.NO_FILE_FOUND);

            console.log(MENSAGENS.FILE_FOUND, req.file);

            const nm_imagem = req.file.filename;
            const uploadDir = path.join(__dirname, '../uploads');
            const fotoUsuarioArmazenada = fs.readFileSync(path.join(uploadDir, nm_imagem));

            // Insere a imagem no modelo tb_img
            const imagemInserida = await tb_img.create({
                img: fotoUsuarioArmazenada,
                nome: nm_imagem,
                tipo: req.file.mimetype,
                cd_user: req.cookies.cookie_login.cd_usuario
            });

            // Atualiza o campo de imagem do usuário no modelo tb_usuario
            const dadosAuthUser = await tb_usuario.findOne({ where: { cd_usuario: req.cookies.cookie_login.cd_usuario } });
            dadosAuthUser.nm_imagem = nm_imagem;
            await dadosAuthUser.save();

            return resp.json({
                status_upload: MENSAGENS.UPLOAD_SUCCEEDED,
                nm_imagem: nm_imagem
            });
        } catch (erro) {
            console.log(erro);
            return resp.send(`Erro ao tentar fazer upload da foto de Perfil: ${erro}`);
        }
    }
};

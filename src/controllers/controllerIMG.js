const { tb_img } = require('../models/modeloIMG.js');
const path = require('path');
const fs = require('fs');

module.exports = {
    uploadFotoPerfil: async (req, res) => {
        const MENSAGENS = {
            NO_FILE_FOUND: 'Você deve selecionar um arquivo! Não havia nenhum!',
            FILE_FOUND: 'Arquivo encontrado no corpo da Requisição:',
            UPLOAD_SUCCEEDED: 'Upload de imagem realizado com sucesso.'
        };

        try {
            if (!req.file) return res.send(MENSAGENS.NO_FILE_FOUND);

            console.log(MENSAGENS.FILE_FOUND, req.file);

            const nm_imagem = req.file.filename;
            const uploadDir = path.join(__dirname, '../uploads');
            const fotoUsuarioArmazenada = fs.readFileSync(path.join(uploadDir, nm_imagem));

            const imagemInserida = await tb_img.create({
                img: fotoUsuarioArmazenada,
                nome: nm_imagem,
                tipo: req.file.mimetype,
                cd_user: req.session.dadosUsuario.cd_usuario
            });

            req.session.dadosUsuario.nm_imagem = nm_imagem;

            

            return res.redirect('/homeUsu');
        } catch (erro) {
            console.log(erro);
            return res.send(`Erro ao tentar fazer upload da foto de Perfil: ${erro}`);
        }
    },

    getFotoPerfil: async (req, res) => {
        try {
            const img = await tb_img.findOne({
                where: { cd_user: req.session.dadosUsuario.cd_usuario }
            });

            if (img) {
                res.contentType(img.tipo);
                res.send(img.img);
            } else {
                res.status(404).send('Imagem não encontrada');
            }
        } catch (error) {
            console.error('Erro ao buscar imagem:', error);
            res.status(500).send('Erro ao buscar imagem');
        }
    },

    alterarFotoPerfil: async (req, res) => {
        const MENSAGENS = {
            NO_FILE_FOUND: 'Você deve selecionar um arquivo! Não havia nenhum!',
            FILE_FOUND: 'Arquivo encontrado no corpo da Requisição:',
            UPLOAD_SUCCEEDED: 'Alteração de imagem realizada com sucesso.'
        };

        try {
            if (!req.file) return res.send(MENSAGENS.NO_FILE_FOUND);

            console.log(MENSAGENS.FILE_FOUND, req.file);

            const nm_imagem = req.file.filename;
            const uploadDir = path.join(__dirname, '../uploads');
            const fotoUsuarioArmazenada = fs.readFileSync(path.join(uploadDir, nm_imagem));
            const cd_usuario = req.session.dadosUsuario.cd_usuario;

            const imgRecord = await tb_img.findOne({ where: { cd_user: cd_usuario } });

            if (imgRecord) {
                await imgRecord.update({
                    img: fotoUsuarioArmazenada,
                    nome: nm_imagem,
                    tipo: req.file.mimetype
                });
            } else {
                await tb_img.create({
                    img: fotoUsuarioArmazenada,
                    nome: nm_imagem,
                    tipo: req.file.mimetype,
                    cd_user: cd_usuario
                });
            }

            req.session.dadosUsuario.nm_imagem = nm_imagem;

            return res.redirect('/homeUsu');
        } catch (erro) {
            console.log(erro);
            if (!res.headersSent) {
                return res.send(`Erro ao tentar fazer upload da foto de Perfil: ${erro}`);
            }
        }
    }
};

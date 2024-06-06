// controllerIMG.js
const { tb_img } = require('../models/modeloIMG.js');
const { tb_usuario } = require('../models/modeloUsuario.js');
const fs = require('fs').promises;
const path = require('path');

module.exports = {
    uploadFotoPerfil: async (req, res) => {
        const MENSAGENS = {
            NO_FILE_FOUND: 'Você deve selecionar um arquivo! Não havia nenhum!',
            FILE_FOUND: 'Arquivo encontrado no corpo da Requisição:',
            UPLOAD_SUCCEEDED: 'Upload de imagem realizado com sucesso.'
        };

        try {
            if (!req.file) {
                console.log(MENSAGENS.NO_FILE_FOUND);
                return res.send(MENSAGENS.NO_FILE_FOUND);
            }

            console.log(MENSAGENS.FILE_FOUND, req.file);

            // Lê o arquivo do sistema de arquivos
            const filePath = path.join(__dirname, '../uploads', req.file.filename);
            const fotoUsuarioArmazenada = await fs.readFile(filePath);

            const cd_usuario = req.session.dadosUsuario.cd_usuario;

            // Insere a imagem no modelo tb_img
            await tb_img.create({
                img: fotoUsuarioArmazenada, // Armazena o buffer da imagem
                nome: req.file.originalname,
                tipo: req.file.mimetype,
                cd_user: cd_usuario
            });

            // Atualiza o campo de imagem do usuário no modelo tb_usuario
            const dadosAuthUser = await tb_usuario.findOne({ where: { cd_usuario } });
            dadosAuthUser.nm_imagem = req.file.originalname; // ou qualquer identificador único
            await dadosAuthUser.save();

            // Atualiza a sessão com a nova imagem do perfil
            req.session.dadosUsuario.nm_imagem = req.file.originalname;

            return res.json({
                status_upload: MENSAGENS.UPLOAD_SUCCEEDED,
                nm_imagem: req.file.originalname
            });
        } catch (erro) {
            console.log(erro);
            return res.send(`Erro ao tentar fazer upload da foto de Perfil: ${erro}`);
        }
    },

    getFotoPerfil: async (req, res) => {
        try {
            const cd_usuario = req.session.dadosUsuario.cd_usuario;
            const imgRecord = await tb_img.findOne({ where: { cd_user: cd_usuario } });

            if (!imgRecord) {
                return res.status(404).send('Imagem não encontrada');
            }

            res.contentType(imgRecord.tipo);
            return res.send(imgRecord.img);
        } catch (erro) {
            console.log(erro);
            return res.status(500).send(`Erro ao tentar buscar a imagem: ${erro}`);
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

            // Lê o arquivo do sistema de arquivos
            const filePath = path.join(__dirname, '../uploads', req.file.filename);
            const fotoUsuarioArmazenada = await fs.readFile(filePath);

            const cd_usuario = req.session.dadosUsuario.cd_usuario;

            const imgRecord = await tb_img.findOne({ where: { cd_user: cd_usuario } });

            // Se houver uma imagem anterior, atualiza-a; caso contrário, insere uma nova
            if (imgRecord) {
                // Atualiza a imagem existente no modelo tb_img
                await imgRecord.update({
                    img: fotoUsuarioArmazenada,
                    nome: req.file.originalname,
                    tipo: req.file.mimetype
                });
            } else {
                // Insere a imagem no modelo tb_img
                await tb_img.create({
                    img: fotoUsuarioArmazenada,
                    nome: req.file.originalname,
                    tipo: req.file.mimetype,
                    cd_user: cd_usuario
                });
            }

            // Atualiza o campo de imagem do usuário no modelo tb_usuario
            const dadosAuthUser = await tb_usuario.findOne({ where: { cd_usuario } });
            dadosAuthUser.nm_imagem = req.file.originalname; // ou qualquer identificador único
            await dadosAuthUser.save();

            // Atualiza a sessão com a nova imagem do perfil
            req.session.dadosUsuario.nm_imagem = req.file.originalname;

            return res.redirect('/homeUsu'); // Redireciona o usuário para a página homeUsu
        } catch (erro) {
            console.log(erro);
            return res.send(`Erro ao tentar fazer upload da foto de Perfil: ${erro}`);
        }
    }
};

const fs = require('fs');
const path = require('path');
const { tb_publicacao } = require('../models/modeloPubli');
const { tb_publicacao_arquivos } = require('../models/modeloPubliArquivos');
const { connSequelize, BD } = require('../../config/coneccao');
const { Model, Op, Sequelize } = require('sequelize');

module.exports = {
    uploadArquivos: async (req, res) => {
        try {
            if (!req.files || req.files.length === 0 || req.files.length > 5) {
                return res.render('homeUsu', { message: 'Você deve selecionar até 5 arquivos!' });
            }

            const cd_usuario = req.session.dadosUsuario.cd_usuario;
            const ds_publicacao = req.body.ds_publicacao || 'Publicação de arquivos';

            // Criar a publicação primeiro
            const publicacao = await tb_publicacao.create({
                cd_usuario: cd_usuario,
                ds_publicacao: ds_publicacao
            });

            const nomesArquivos = [];
            const promises = req.files.map(async (file) => {
                const arquivoInserido = await tb_publicacao_arquivos.create({
                    cd_publicacao: publicacao.cd_publicacao,
                    arquivos: fs.readFileSync(file.path), // Ler o arquivo do sistema de arquivos
                    tipo_arquivo: file.mimetype
                });
                nomesArquivos.push(file.originalname);
            });

            await Promise.all(promises);

            // Atualizar a publicação com os nomes dos arquivos
            publicacao.ds_arquivos = JSON.stringify(nomesArquivos);
            await publicacao.save();

            return res.redirect('/homeUsu');
        } catch (erro) {
            console.log(erro);
            return res.send(`Erro ao tentar fazer upload dos arquivos: ${erro}`);
        }
    },
    getPublicacoes: async (req, res) => {
        try {
            const publicacoes = await tb_publicacao.findAll({
                include: [{
                    model: tb_publicacao_arquivos,
                    as: 'tb_publicacao_arquivos',
                    where: {
                        cd_usuario: req.params.cd_usuario
                    }
                }],
                where: { cd_usuario: req.params.cd_usuario }
            });
    
            const publicacoesComTipo = publicacoes.map(publi => {
                const arquivosComTipo = publi.tb_publicacao_arquivos.map(arquivo => {
                    if (arquivo.tipo_arquivo.startsWith('image/')) {
                        arquivo.tipo = 'image';
                    } else if (arquivo.tipo_arquivo.startsWith('video/')) {
                        arquivo.tipo = 'video';
                    } else {
                        arquivo.tipo = 'unknown';
                    }
                    return arquivo;
                });
    
                return {
                    ...publi.toJSON(),
                    tb_publicacao_arquivos: arquivosComTipo
                };
            });
    
            res.json(publicacoesComTipo); // Enviar uma resposta JSON
    
        } catch (error) {
            console.error('Erro ao buscar publicações:', error);
            res.status(500).send('Erro ao buscar publicações'); // Enviar uma resposta de erro
        }
    }
};
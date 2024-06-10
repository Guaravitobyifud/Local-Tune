const fs = require('fs');
const path = require('path');
const { tb_publicacao } = require('../models/modeloPubli');
const {tb_publicacao_arquivos} = require('../models/modeloPubliArquivos')

module.exports = {
    uploadArquivos: async (req, res) => {
        try {
            if (!req.files || req.files.length === 0 || req.files.length > 5) {
                return res.render('homeUsu', { message: 'Você deve selecionar até 5 arquivos!' });
            }

            const cd_usuario = req.session.dadosUsuario.cd_usuario; // substitua pelo ID do usuário da sessão
            const ds_publicacao = req.body.ds_publicacao || 'Publicação de arquivos';

            const nm_imagem = req.file.filename;
            const uploadDir = path.join(__dirname, '../uploads');
            const fotoUsuarioArmazenada = fs.readFileSync(path.join(uploadDir, nm_imagem));

            // Criar a publicação primeiro
            const publicacao = await tb_publicacao.create({
                cd_usuario: cd_usuario,
                ds_publicacao: ds_publicacao
            });

            const nomesArquivos = [];
            const promises = req.files.map(async (file) => {
                console.log('Dados do arquivo:', file); // Verificar os dados do arquivo

                const arquivoInserido = await tb_publicacao_arquivos.create({
                    cd_publicacao: publicacao.cd_publicacao,
                    arquivos: fotoUsuarioArmazenada,
                    tipo_arquivo: file.mimetype
                });
                nomesArquivos.push(file.originalname);
                console.log('Arquivo inserido:', arquivoInserido); // Verificar se o arquivo foi inserido
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
    }
};

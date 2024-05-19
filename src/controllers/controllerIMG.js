//TESTES SOMENTE TESTES
const { tb_img } = require('../models/modeloIMG.js');


exports.imgUpload = async (req, res) => {
    try {
        // Verifique se existe um arquivo enviado na requisição
        if (!req.file) {
            return res.status(400).send('Nenhum arquivo enviado.');
        }

        // Obtenha o caminho do arquivo temporário
        const tempFilePath = req.file.path;

        // Ler o arquivo temporário
        fs.readFile(tempFilePath, async (err, data) => {
            if (err) {
                return res.status(500).send('Erro ao ler o arquivo.');
            }

            // Salvar a imagem no banco de dados
            try {
                const imgData = await tb_img.create({
                    img: data
                });

                // Remover o arquivo temporário após o upload
                fs.unlink(tempFilePath, (err) => {
                    if (err) {
                        console.error('Erro ao excluir o arquivo temporário:', err);
                    }
                });

                // Redirecionar ou enviar resposta após o upload bem-sucedido
                res.redirect('/sucesso');
            } catch (error) {
                console.error('Erro ao salvar a imagem no banco de dados:', error);
                return res.status(500).send('Erro ao salvar a imagem no banco de dados.');
            }
        });
    } catch (error) {
        console.error('Erro ao fazer upload de imagem:', error);
        return res.status(500).send('Erro ao fazer upload de imagem.');
    }
}
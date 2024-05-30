const express = require('express');
const router = express.Router();
const { tb_img } = require('../models/modeloIMG.js');

// Rota para obter a imagem pelo id do usuário
router.get('/image/:cd_user', async (req, res) => {
    try {
        const cd_user = req.params.cd_user;
        const imagem = await tb_img.findOne({ where: { cd_user } });

        if (!imagem) {
            return res.status(404).send('Imagem não encontrada');
        }

        res.setHeader('Content-Type', imagem.tipo);
        res.send(imagem.img);
    } catch (erro) {
        console.log(erro);
        res.status(500).send('Erro ao buscar a imagem');
    }
});

module.exports = router;
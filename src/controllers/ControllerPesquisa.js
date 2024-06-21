const { connSequelize, BD } = require('../../config/coneccao');
const { Model, Op, Sequelize } = require('sequelize');
const { tb_contato } = require('../models/modeloContato');
const { tb_endereco } = require('../models/modeloEndereco');
const { tb_tipoMusical } = require('../models/modeloTipoMusical');
const { tb_tipoUsuario } = require('../models/modeloTipoUsuario');
const { tb_usuario } = require('../models/modeloUsuario');
const { tb_usuTipoMus } = require('../models/modeloUsuTipoMus');
const { tb_img } = require('../models/modeloIMG');

exports.Pesquisa = async (req, res) => {
    const { busca } = req.body;
    try {
        const resultBuscaUsu = await tb_usuTipoMus.findAll({
            attributes: [
                [Sequelize.literal('tb_usuario.nm_usuario'), "Usuario"],
                [Sequelize.literal('tb_usuario.nm_cidade'), "Endereco"],
            ],
            include: [
                {
                    model: tb_usuario,
                    required: true,
                    attributes: [],
                    include: [],
                    where: {
                        nm_usuario: {
                            [Op.like]: `${busca}%`
                        },
                    },
                },
            ],
            raw: true
        });

        const resultBuscaUsu2 = await tb_usuTipoMus.findAll({
            attributes: [
                [Sequelize.literal('tb_tipoMusical.ds_descricaoTpMusical'), 'Tipo_Musical'],
            ],
            include: [
                {
                    model: tb_usuario,
                    required: true,
                    attributes: [],
                    where: {
                        nm_usuario: {
                            [Op.like]: `${busca}%`
                        },
                    },
                },
                {
                    model: tb_tipoMusical,
                    required: true,
                    attributes: []
                },
            ],
            raw: true
        });

        res.render('Search', { message: resultBuscaUsu, message2: resultBuscaUsu2 });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

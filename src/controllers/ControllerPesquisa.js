const { connSequelize, BD } = require('../../config/coneccao')
const {Model, Op, Sequelize} = require('sequelize')
const {tb_contato} = require ('../models/modeloContato')
const {tb_endereco} = require ('../models/modeloEndereco')
const {tb_estabelecimento} = require ('../models/modeloEstabelecimento')
const {tb_musico} = require ('../models/modeloMusico')
const {tb_tipoMusical} = require ('../models/modeloTipoMusical')
const {tb_tipoUsuario} = require ('../models/modeloTipoUsuario')
const {tb_usuario} = require ('../models/modeloUsuario')


exports.Pesquisa = async (req, res) => {
    const { busca } = req.body;
    try {
        const resultBuscaUsu2 = await tb_usuario.findAll({
            attributes: [
                [Sequelize.literal('tb_usuario.nm_usuario'), "Usuario"],
                [Sequelize.literal('tb_tipoMusical.ds_descricaoTpMusical'), 'Tipo_Musical'],
                [Sequelize.literal('tb_contato.nr_celular'), "Numero_de_celular"],
                [Sequelize.literal('tb_endereco.nm_endereco'), "Endereco"]
            ],
            include: [
                {
                    model: tb_contato,
                    required: false,
                    attributes: []
                },
                {
                    model: tb_endereco,
                    required: false,
                    attributes: []
                },
                {
                    model: tb_tipoMusical,
                    required: true,
                    attributes: []
                },
            ],
            where: {
                nm_usuario: {
                    [Op.like]: `${busca}%`
                },
            },
            raw: true
        });
        res.render('Search', { message: resultBuscaUsu2 });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};
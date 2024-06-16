const { connSequelize } = require('../../config/coneccao');
const { DataTypes } = require('sequelize');

// Importar todos os modelos
const {tb_usuario} = require('./modeloUsuario');
const {tb_img} = require('./modeloIMG')
const {tb_publicacao} = require('./modeloPubli')
const {tb_publicacao_arquivos} = require('./modeloPubliArquivos')
const {tb_banda} = require('./modeloBanda')

module.exports = {
    connSequelize,
    tb_usuario,
    tb_img,
    tb_publicacao,
    tb_publicacao_arquivos,
    tb_banda
};
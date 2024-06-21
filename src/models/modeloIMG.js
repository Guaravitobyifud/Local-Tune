const { connSequelize } = require('../../config/coneccao');
const { DataTypes } = require('sequelize');
const { _padraoTableBDExistence } = require('../../config/confdobanco');
const { model } = require('mongoose');
const {tb_usuario} = require('./modeloUsuario')

const tb_img = connSequelize.define('tb_img', {
    cd_img: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    img: {
        type: DataTypes.BLOB('long'),
        allowNull: false // Permitindo valores nulos para campos BLOB não é recomendado
    },
    nome: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    tipo: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    cd_user: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'tb_usuario',
            key: 'cd_usuario'
        }
    },
}, _padraoTableBDExistence('tb_img'));

tb_usuario.hasOne(tb_img, { foreignKey: 'cd_user' });
tb_img.belongsTo(tb_usuario, { foreignKey: 'cd_user' });

module.exports = {
    tb_img
};

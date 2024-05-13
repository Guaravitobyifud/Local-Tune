const { connSequelize } = require('../../config/coneccao')
const { DataTypes} = require ('sequelize')
const { _padraoTableBDExistence } = require('../../config/confdobanco');
const { tb_usuario } = require('./modeloUsuario');

const tb_banda = connSequelize.define('tb_banda', {
    cd_banda: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
}, _padraoTableBDExistence('tb_banda'));

module.exports = {
    tb_banda
};
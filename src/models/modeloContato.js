const { connSequelize } = require('../../config/coneccao')
const { DataTypes} = require ('sequelize')
const { _padraoTableBDExistence } = require('../../config/confdobanco')

const tb_contato = connSequelize.define('tb_contato', {
    cd_contato: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    nr_celular: {
        type: DataTypes.STRING(11),
    },
    nm_email: {
        type: DataTypes.STRING(60),
        allowNull: false
    }
}, _padraoTableBDExistence('tb_contato'));

module.exports = {
    tb_contato
};
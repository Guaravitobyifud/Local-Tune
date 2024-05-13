const { connSequelize } = require('../../config/coneccao')
const { DataTypes} = require ('sequelize')
const { _padraoTableBDExistence } = require('../../config/confdobanco')

const tb_regsLegal = connSequelize.define('tb_regsLegal', {
    cd_regsLegal: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    cd_cnpj: {
        type: DataTypes.CHAR(18),
        allowNull: true
    },
    cd_cpf: {
        type: DataTypes.CHAR(14),
        allowNull: true
    }
}, _padraoTableBDExistence('tb_regsLegal'));

module.exports = {
    tb_regsLegal
};
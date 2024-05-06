const { connSequelize } = require('../../config/coneccao')
const { DataTypes} = require ('sequelize')
const { _padraoTableBDExistence } = require('../../config/confdobanco')

const tb_endereco = connSequelize.define('tb_endereco', {
    cd_endereco: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    nm_endereco: {
        type: DataTypes.STRING(200),
        allowNull: true
    }
    // nm_cidade: {
    //     type: DataTypes.STRING(30),
    //     allowNull: true
    // },
    // nm_rua: {
    //     type: DataTypes.STRING(30),
    //     allowNull: true
    // },
    // nr_rua: {
    //     type: DataTypes.INTEGER,
    //     allowNull: true
    // }
}, _padraoTableBDExistence('tb_endereco'));

module.exports = {
    tb_endereco
};
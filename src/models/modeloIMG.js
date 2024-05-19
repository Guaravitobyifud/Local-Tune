const { connSequelize } = require('../../config/coneccao')
const { DataTypes} = require ('sequelize')
const { _padraoTableBDExistence } = require('../../config/confdobanco')

const tb_img = connSequelize.define('tb_endereco', {
    cd_img: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    img: {
        type: DataTypes.BLOB
    }
}, _padraoTableBDExistence('tb_img'));

module.exports = {
    tb_img
};
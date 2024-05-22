const { connSequelize } = require('../../config/coneccao')
const { DataTypes} = require ('sequelize')
const { _padraoTableBDExistence } = require('../../config/confdobanco')

const tb_img = connSequelize.define('tb_img', {
    cd_img: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    img: {
        type: DataTypes.BLOB
    },
    cd_user: {
        type: DataTypes.STRING(60),
        allowNull: false,
    },
}, _padraoTableBDExistence('tb_img'));

module.exports = {
    tb_img
};
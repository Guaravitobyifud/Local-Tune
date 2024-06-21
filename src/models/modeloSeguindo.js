const { connSequelize } = require('../../config/coneccao')
const { DataTypes} = require ('sequelize')
const { _padraoTableBDExistence } = require('../../config/confdobanco.js')
const {tb_usuario} = require ('./modeloUsuario')

 
const tb_seguindoSeguidor = connSequelize.define('tb_seguindoSeguidor', {
    cd_seguindo: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
            model: 'tb_usuario',
            key: 'cd_usuario'
        }
    },
    cd_seguidor: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
            model: 'tb_usuario',
            key: 'cd_usuario'
        }
    },
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    }
},_padraoTableBDExistence('tb_seguindoSeguidor'));


module.exports = {
    tb_seguindoSeguidor
};
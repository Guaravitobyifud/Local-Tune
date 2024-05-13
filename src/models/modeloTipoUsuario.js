const { connSequelize } = require('../../config/coneccao')
const { DataTypes} = require ('sequelize')
const { _padraoTableBDExistence } = require('../../config/confdobanco')

const tb_tipoUsuario = connSequelize.define('tb_tipoUsuario',{
    cd_tipoUsuario:{
        type:DataTypes.INTEGER,
        allowNull:false,
        primaryKey: true,
        autoIncrement: true
    },
    ds_descricaoTpUsu:{
        type:DataTypes.TEXT(30),
        allowNull:false
    },
}, _padraoTableBDExistence('tb_tipoUsuario'))

module.exports ={
    tb_tipoUsuario
}
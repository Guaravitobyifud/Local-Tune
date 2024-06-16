const { connSequelize } = require('../../config/coneccao')
const { DataTypes} = require ('sequelize')
const { _padraoTableBDExistence } = require('../../config/confdobanco.js')
const {tb_publicacao} = require ('./modeloPubli')
const {tb_usuario} = require ('./modeloUsuario')

 
const tb_curtida = connSequelize.define('tb_curtida', {
    cd_publicacao: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'tb_publicacao',
            key: 'cd_publicacao'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    },
    cd_curtida: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'tb_usuario',
            key: 'cd_usuario'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    }
}, {
    tableName: 'tb_curtida',
    timestamps: false
});

module.exports = {tb_curtida};
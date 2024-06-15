const { connSequelize } = require('../../config/coneccao')
const { DataTypes} = require ('sequelize')
const { _padraoTableBDExistence } = require('../../config/confdobanco.js')
const {tb_tipoUsuario} = require ('./modeloTipoUsuario.js')
const {tb_endereco} = require ('./modeloEndereco')
const { tb_contato } = require('./modeloContato.js')
const { tb_regsLegal } = require('./modeloRegsLegal.js')
 
const tb_usuario = connSequelize.define('tb_usuario', {
    cd_usuario: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    cd_tipoUsuario: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'tb_tipoUsuario',
            key: 'cd_tipoUsuario'
        }
    },
    nm_email: {
        type: DataTypes.STRING(60),
        allowNull: false,
        unique: true
    },
    nm_usuario:{
        type:DataTypes.TEXT(30),
    } ,
    cd_endereco: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'tb_endereco',
            key: 'cd_endereco'
        }
    },
    cd_contato: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'tb_contato',
            key: 'cd_contato'
        }
    },
    cd_regsLegal: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'tb_regsLegal',
            key: 'cd_regsLegal'
        }
    },
    cd_senha: {
        type: DataTypes.STRING(200),
    }
}, _padraoTableBDExistence('tb_usuario'));

tb_tipoUsuario.hasMany(tb_usuario, {foreignKey: 'cd_tipoUsuario'});
tb_usuario.belongsTo(tb_tipoUsuario, {foreignKey: 'cd_tipoUsuario'});

tb_endereco.hasMany(tb_usuario, {foreignKey: 'cd_endereco'});
tb_usuario.belongsTo(tb_endereco, {foreignKey: 'cd_endereco'});
 
tb_contato.hasOne(tb_usuario, {foreignKey: 'cd_contato'});
tb_usuario.belongsTo(tb_contato, {foreignKey: 'cd_contato'});

tb_regsLegal.hasMany(tb_usuario, {foreignKey: 'cd_regsLegal'});
tb_usuario.belongsTo(tb_regsLegal, {foreignKey: 'cd_regsLegal'});

module.exports = {
    tb_usuario,
};
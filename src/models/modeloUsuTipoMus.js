const { connSequelize } = require('../../config/coneccao')
const { DataTypes} = require ('sequelize')
const { _padraoTableBDExistence } = require('../../config/confdobanco.js')
const {tb_usuario} = require ('./modeloUsuario.js')
const {tb_tipoMusical} = require ('./modeloTipoMusical.js')

 
const tb_usuTipoMus = connSequelize.define('tb_usuTipoMus', {
    cd_usuTipoMus: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    cd_usuario: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'tb_usuario',
            key: 'cd_usuario'
        }
    },
    cd_tipoMusical: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'tb_tipoMusical',
            key: 'cd_tipoMusical'
        }
    }
}, _padraoTableBDExistence('tb_usuTipoMus'));

tb_tipoMusical.hasMany(tb_usuTipoMus, {foreignKey: 'cd_tipoMusical'});
tb_usuTipoMus.belongsTo(tb_tipoMusical, {foreignKey: 'cd_tipoMusical'});

tb_usuario.hasMany(tb_usuTipoMus, {foreignKey: 'cd_usuario'});
tb_usuTipoMus.belongsTo(tb_usuario, {foreignKey: 'cd_usuario'});
 
module.exports = {
    tb_usuTipoMus
};
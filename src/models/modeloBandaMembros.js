const { connSequelize } = require('../../config/coneccao')
const { DataTypes} = require ('sequelize')
const { _padraoTableBDExistence } = require('../../config/confdobanco.js')
const {tb_banda} = require ('./modeloBanda.js')
const {tb_usuTipoMus} = require ('./modeloUsuTipoMus.js')

 
const tb_bandaMembros = connSequelize.define('tb_bandaMembros', {
    cd_banda: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'tb_banda',
            key: 'cd_banda'
        }
    },
    cd_UsuTipoMus: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'tb_UsuTipoMus',
            key: 'cd_UsuTipoMus'
        }
    }
}, _padraoTableBDExistence('tb_bandaMembros'));

tb_banda.hasMany(tb_bandaMembros, {foreignKey: 'cd_usuario'});
tb_bandaMembros.belongsTo(tb_banda, {foreignKey: 'cd_usuario'});

tb_usuTipoMus.hasMany(tb_bandaMembros, {foreignKey: 'cd_usuTipoMus'});
tb_bandaMembros.belongsTo(tb_usuTipoMus, {foreignKey: 'cd_usuTipoMus'});

module.exports = {
    tb_bandaMembros
};
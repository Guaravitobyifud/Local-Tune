const { connSequelize } = require('../../config/coneccao')
const { DataTypes} = require ('sequelize')
const { _padraoTableBDExistence } = require('../../config/confdobanco.js')
const {tb_usuario} = require ('./modeloUsuario.js')

 
const tb_seguindoSeguidor = connSequelize.define('tb_seguindoSeguidor', {
    cd_seguindo: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'tb_usuario',
            key: 'cd_usuario'
        }
    },
    cd_seguidor: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'tb_usuario',
            key: 'cd_usuario'
        }
    },
}, _padraoTableBDExistence('tb_usuTipoMus'));

tb_usuario.hasMany(tb_seguindoSeguidor, {foreignKey: 'cd_seguindo' });
tb_seguindoSeguidor.belongsTo(tb_usuario, {foreignKey: 'cd_seguindo'});

tb_usuario.hasMany(tb_seguindoSeguidor, {foreignKey: 'cd_seguidor' });
tb_seguindoSeguidor.belongsTo(tb_usuario, {foreignKey: 'cd_seguidor'});
 
module.exports = {
    tb_seguindoSeguidor
};
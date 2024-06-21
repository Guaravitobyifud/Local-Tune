const { connSequelize } = require('../../config/coneccao')
const { DataTypes} = require ('sequelize')
const { _padraoTableBDExistence } = require('../../config/confdobanco.js')
const {tb_publicacao} = require ('./modeloPubli')
const {tb_usuario} = require ('./modeloUsuario')

 
const tb_curtida = connSequelize.define('tb_curtida', {
    cd_curtida: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
    },
    cd_usuario: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
            model: 'tb_usuario',
            key: 'cd_usuario'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    },
    cd_publicacao: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
            model: 'tb_publicacao',
            key: 'cd_publicacao'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    }
},_padraoTableBDExistence('tb_curtida'));

// Relacionamento entre tb_usuario e tb_curtida
tb_usuario.hasMany(tb_curtida, { foreignKey: 'cd_usuario' });
tb_curtida.belongsTo(tb_usuario, { foreignKey: 'cd_usuario' });

// Relacionamento entre tb_publicacao e tb_curtida
tb_publicacao.hasMany(tb_curtida, { foreignKey: 'cd_publicacao' });
tb_curtida.belongsTo(tb_publicacao, { foreignKey: 'cd_publicacao' });

module.exports = {
    tb_curtida
};
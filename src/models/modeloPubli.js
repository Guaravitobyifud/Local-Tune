const { connSequelize } = require('../../config/coneccao');
const { DataTypes } = require('sequelize');
const { _padraoTableBDExistence } = require('../../config/confdobanco');
const { tb_usuario } = require('./modeloUsuario');

const tb_publicacao = connSequelize.define('tb_publicacao', {
    cd_publicacao: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    cd_usuario: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: tb_usuario,
            key: 'cd_usuario'
        }
    },
    ds_publicacao: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    dt_publicacao: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false
    },
    ds_arquivos: {
        type: DataTypes.STRING(255),
        allowNull: true
    }
}, _padraoTableBDExistence('tb_publicacao'));

// Definir as associações com alias diferentes dos atributos
tb_usuario.hasMany(tb_publicacao, { foreignKey: 'cd_usuario', as: 'publicacoes' });
tb_publicacao.belongsTo(tb_usuario, { foreignKey: 'cd_usuario', as: 'usuario' });

module.exports = {
    tb_publicacao
};

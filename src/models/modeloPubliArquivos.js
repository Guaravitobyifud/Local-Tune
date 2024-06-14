// const { connSequelize } = require('../../config/coneccao');
// const { DataTypes } = require('sequelize');
// const { _padraoTableBDExistence } = require('../../config/confdobanco');
// const { tb_publicacao } = require('./modeloPubli.js');

// const tb_publicacao_arquivos = connSequelize.define('tb_publicacao_arquivos', {
//     cd_arquivo: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//         primaryKey: true,
//         autoIncrement: true
//     },
//     cd_publicacao: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//         references: {
//             model: 'tb_publicacao',
//             key: 'cd_publicacao'
//         }
//     },
//     arquivos: {
//         type: DataTypes.BLOB('long'),
//         allowNull: false
//     },
//     tipo_arquivo: {
//         type: DataTypes.STRING(255),
//         allowNull: false
//     }
// }, _padraoTableBDExistence('tb_publicacao_arquivos'));

// // Defina a associação corretamente, usando o mesmo alias
// tb_publicacao.hasMany(tb_publicacao_arquivos, { foreignKey: 'cd_publicacao', as: 'tb_publicacao_arquivos' });

// module.exports = {
//     tb_publicacao_arquivos
// };

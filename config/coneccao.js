const {Sequelize} = require ('sequelize')


const usuario = 'root'
const senha = 'root'
const BD = 'db_LocalTune'
const connSequelize =  new Sequelize(
    `mysql:${usuario}:${senha}@localhost:3306/${BD}`
)

module.exports = {
    connSequelize,
    BD
}
const {Sequelize} = require ('sequelize')


const usuario = 'root'
const senha = 'root'
const BD = 'db_teste'
const connSequelize =  new Sequelize(
    `mysql:${usuario}:${senha}@localhost:3307/${BD}`
)

module.exports = {
    connSequelize,
    BD
}
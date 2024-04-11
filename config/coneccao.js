const {Sequelize} = require ('sequelize')


const usuario = 'root'
const senha = '27010206'
const BD = 'db_teste'
const connSequelize =  new Sequelize(
    `mysql:${usuario}:${senha}@localhost:3306/${BD}`
)

module.exports = {
    connSequelize,
    BD
}
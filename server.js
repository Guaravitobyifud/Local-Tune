const express = require('express')
const app = express()
const path = require('path')
const mysql = require('mysql2')
const hbs = require('express-hbs/lib/hbs')
const {connSequelize, BD} = require('./config/coneccao')
const {query} = require('./src/controllers/controlerQuery')
const auth = require('./src/routes/auth')


connSequelize.sync()
connSequelize.authenticate().then(() => {
        console.log(`Conexao bem sucedido do Sequelize com Mysql ${BD}`)
}).catch(erroConn => {
    console.log(`Incapaz de se conectar ao banco ${BD}`, erroConn)
})

//para ir às rotas
app.set('view engine', 'hbs')


app.set( 'views', path.join(__dirname, 'src/views'))

const publicDirectory = path.join(__dirname, 'src/public')
app.use(express.static(publicDirectory))


app.use('/', require ('./src/routes/rotas'))

app.use('/auth', auth)

// Inicia o servidor
app.listen(5800, async() => {
    console.log('Servidor rodando na porta 5800')
});

const express = require('express')
const app = express()
const path = require('path')
const mysql = require('mysql2')
const hbs = require('express-hbs/lib/hbs')
const {connSequelize, BD} = require('./config/coneccao')
const {query} = require('./src/controllers/controlerQuery')
const auth = require('./src/routes/auth')

// Middleware de análise de corpo para dados JSON
app.use(express.json());

// Middleware de análise de corpo para dados codificados em URL
app.use(express.urlencoded({ extended: true }));

// Importe e use suas rotas
const authRouter = require('./src/routes/auth');
app.use('/auth', authRouter);

// Middleware para logar o corpo da solicitação
app.use((req, res, next) => {
    console.log('email, password', req.body);
    next();
});


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

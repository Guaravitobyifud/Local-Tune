const express = require('express');
const app = express();
const path = require('path');
const hbs = require('hbs');
const bodyParser = require('body-parser')
const { connSequelize, BD } = require('./config/coneccao');

// Middleware de análise de corpo para dados JSON
app.use(express.json());

// Middleware de análise de corpo para dados codificados em URL
app.use(express.urlencoded({ extended: true }));

// Configuração de diretórios de visualização e mecanismo de visualização
app.set('views', path.join(__dirname, './src/views'));
app.set('view engine', 'hbs');

// Servir arquivos estáticos
const publicDirectory = path.join(__dirname, '/src/public');
app.use(express.static(publicDirectory));

// Importar e usar suas rotas
const rotas = require('./src/routes/rotas');
const authRouter = require('./src/routes/auth');



// Usar as rotas
app.use('/', rotas);
app.use('/auth', authRouter);

// Sincronizar o Sequelize com o banco de dados e iniciar o servidor
connSequelize.sync()
    .then(() => {
        console.log(`Conexão bem-sucedida do Sequelize com MySQL ${BD}`);
        app.listen(5800, () => {
            console.log('Servidor rodando na porta 5800');
        });
    })
    .catch(erroConn => {
        console.log(`Incapaz de se conectar ao banco ${BD}`, erroConn);
    });

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const { connSequelize, BD } = require('./config/coneccao');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const imageRouter = require('./src/routes/imageRouter');
const exphbs = require('express-handlebars');
const authRouter = require('./src/routes/auth');

// Middleware de análise de corpo para dados JSON
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
    secret: 'Fridinha_Fofinha',
    saveUninitialized: false,
    resave: false,
}));

// Configuração de diretórios de visualização e mecanismo de visualização
const hbs = exphbs.create({
    helpers: {
        eq: (a, b) => a === b
    },
    layoutsDir: path.join(__dirname, './src/views'), // Caminho para o diretório de layouts
    defaultLayout: false // Desabilitar o layout padrão
});
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, './src/views'));

// Servir arquivos estáticos
const publicDirectory = path.join(__dirname, './src/public');
app.use(express.static(publicDirectory));

// Usar as rotas
app.use('/', require('./src/routes/rotas'));
app.use('/auth', authRouter);
app.use(imageRouter);

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

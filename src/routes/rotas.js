const express = require('express');
const router = express.Router();
const multer = require('multer');
const multerConfig = require('../middleware/multer');
const cookieParser = require('cookie-parser');

// Middleware para verificar a autenticação do usuário
function userAuth(req, res, next) {
    if (req.cookies && req.cookies.cookie_login) {
        next(); // Continua para o próximo middleware
    } else {
        res.render('index', { message: 'Por favor, faça login' }); // Renderiza a página inicial com uma mensagem de erro
    }
}
router.get("/login", (req, res) => {
    // Verifica se o usuário está autenticado pelo middleware userAuth
    if (req.cookies && req.cookies.cookie_login) {
        // Renderiza a página inicial com o nome de usuário extraído do cookie
        res.render('homeUsu', { 
            username: 'Bem-vindo ' + JSON.parse(req.cookies.cookie_login).nm_usuario,
            logout: '<h3><a class="bo" href="/logout">logout</a></h3>' 
        });
    } else {
        // Caso contrário, renderiza a página de login
        res.render('login');
    }
});

router.get("/cadastro", (req, res) => {
    res.render("cadastro");
});

router.get("/cadastroMusico", (req, res) => {
    res.render("cadastroMusico");
});

router.get("/Search", (req, res) => {
    res.render("Search");
});

router.get("/homeUsu", userAuth, (req, res) => {
    if (req.cookies && req.cookies.cookie_login) {
        res.render('homeUsu', { 
            username: 'Bem-vindo ' + JSON.parse(req.cookies.cookie_login).nm_usuario,
            logout: '<h3><a class="bo" href="/logout">logout</a></h3>' 
        });
    } else {
        res.redirect('/login'); // Redireciona para a página de login se não houver usuário na sessão
    }
});

router.post("/posts", multer(multerConfig).single('file'), async (req, res) => {
    console.log(req.file); // Note que agora estamos usando req.file para acessar o arquivo enviado
    // const imgs = req.files.map(file => ({ img: file.path })); // Armazena apenas o caminho do arquivo
});

router.get("/cadastroSTBL", (req, res) => {
    res.render("cadastroSTBL");
});

router.get("/", (req, res) => {
    res.render("index");
});

router.get("/logout", function (req, res) {
    req.session.destroy(function(err) {
        if (err) {
            console.log(err);
        } else {
            // Remove o cookie 'cookie_login'
            res.clearCookie('cookie_login');

            // Configura o cabeçalho Cache-Control para indicar que a página não deve ser armazenada em cache
            res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, private');

            // Redireciona o usuário para a página de login após o logout
            res.redirect('/login');
        }
    });
});

router.get("/uploadimg", (req, res) => {
    res.render('uploadimg');
});

module.exports = router;
const express = require('express')
const router = express.Router()
const app = require('../../server');
const session = require('express-session');
const multer = require('multer')
const multerConfig = require('../scripts/multer')
const PostImg = require('../models/modeloIMG')

function userAuth(req, res, next) {
    if (req.session.user) {
      next();
    } else {
      res.render('index', {message: 'Por favor, faça login'});
    }
  }

  router.get("/login", (req, res) => {
    if (req.session.user) {
        res.render('homeUsu', { 
            username: 'Bem-vindo ' + req.session.user.username,
            logout: '<h3><a class="bo" href="/logout">logout</a></h3>' 
        });
    } else {
        res.render('login'); // Redireciona para a página de login
    }
});

router.get("/cadastro", (req, res) => {
    res.render("cadastro")

});

router.get("/cadastroMusico", (req, res) => {
    res.render("cadastroMusico")
});

router.get("/Search", (req, res) => {
    res.render("Search");
});


router.get("/homeUsu", userAuth, (req, res) => {
    // Verifica se há um usuário na sessão
    if (req.session.user) {
        res.render('homeUsu', { 
            username: 'Bem-vindo ' + req.session.user.username,
            logout: '<h3><a class="bo" href="/logout">logout</a></h3>' 
        });
    } else {
        res.redirect('/login'); // Redireciona para a página de login se não houver usuário na sessão
    }
});

// router.post("/posts", multer(multerConfig).array('file'), async(req, res)=>{
//     console.log(req.file)
//     const post = await PostImg.create({
//         img: req.file
//     })
//     res.json(post)
// })

router.post("/posts", multer(multerConfig).single('file'), async(req, res) => {
    console.log(req.file); // Note que agora estamos usando req.files para acessar os arquivos enviados
    
    // const imgs = req.files.map(file => ({ img: file.path })); // Armazena apenas o caminho do arquivo
    
    
    
});

router.get("/cadastroSTBL", (req, res) => {
    res.render("cadastroSTBL")
});

router.get("/", (req, res) => {
    res.render("index")
});

router.get("/logout", function (req, res) {
    req.session.destroy(function(err){
        if(err){
            console.log(err);
        } else {
            res.clearCookie('connect.sid'); // Limpa o cookie chamado 'cookie_login'
            res.redirect('/');
        }
    });
});

router.get("/uploadimg", (req, res) => {
    if (req.session.user) {
        res.render('homeUsu', { 
            username: 'Bem-vindo ' + req.session.user.username,
            logout: '<h3><a class="bo" href="/logout">logout</a></h3>' 
        });
    } else {
        res.redirect('/login'); // Redireciona para a página de login se não houver usuário na sessão
    }
});

module.exports = router;
const express = require('express')
const router = express.Router()
const app = require('../../server');
const { Cookie } = require('express-session');

function userAuth(req, res, next) {
    if (req.session.user) {
      next();
    } else {
      res.render('index', {message: 'Por favor, faça login'});
    }
  }

router.get("/login", (req, res) => {
        res.render("login");
});

router.get("/cadastro", (req, res) => {
    res.render("cadastro")

});

router.get("/cadastroMusico", (req, res) => {
    res.render("cadastroMusico")
});


router.get("/homeUsu", userAuth, (req, res) => {
    res.render('homeUsu')
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

module.exports = router;
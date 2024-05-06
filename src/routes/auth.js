const express = require('express')
const router = express.Router()
const authlogin = require('../controllers/Controllerlogin')
const authcadastro = require('../controllers/Controllercadastro')
const pesquisa = require('../controllers/ControllerPesquisa')


'auth/login'
router.post("/login", authlogin.login);

'auth/cadastrouser'
router.post("/cadastrouser", authcadastro.cadastroUsuario);

'auth/cadastromusic'
router.post("/cadastromusic", authcadastro.cadastroMusico);

'auth/cadastrostbl'
router.post("/cadastrostbl", authcadastro.cadastroStbl);

'auth/busca '
router.post("/busca", pesquisa.Pesquisa);

module.exports = router
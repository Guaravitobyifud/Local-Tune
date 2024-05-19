const express = require('express')
const router = express.Router()
const authlogin = require('../controllers/Controllerlogin')
const authcadastro = require('../controllers/Controllercadastro')
const pesquisa = require('../controllers/ControllerPesquisa')
const authUpload = require ('../controllers/controllerIMG')

'auth/login'
router.post("/login", authlogin.login);

'auth/cadastrouser'
router.post("/cadastrouser", authcadastro.cadastroUsuario);

'auth/cadastromusic'
router.post("/cadastromusic", authcadastro.cadastroMusico);

'auth/cadastrostbl'
router.post("/cadastrostbl", authcadastro.cadastroStbl);

'auth/Search '
router.post("/Search", pesquisa.Pesquisa);

'auth/uploadimg'
router.post("/uploadimg", authUpload.imgUpload)
module.exports = router
const express = require('express')
const router = express.Router()
const authlogin = require('../controllers/Controllerlogin')
const authcadastro = require('../controllers/Controllercadastro')


'auth/login'
router.post("/login", authlogin.login);

'auth/cadastrouser'
router.post("/cadastrouser", authcadastro.cadastroUsuario);

'auth/cadastromusic'
router.post("/cadastromusic", authcadastro.cadastroMusico);

'auth/cadastrostbl'
router.post("/cadastrostbl", authcadastro.cadastroStbl);

module.exports = router
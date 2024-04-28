const express = require('express')
const router = express.Router()
const authlogin = require('../controllers/Controllerlogin')
const authcadastro = require('../controllers/Controllercadastro')


'auth/login'
router.post("/login", authlogin.login);

'auth/cadastrouser'
router.post("/cadastrouser", authcadastro.cadastroUsuario);

module.exports = router
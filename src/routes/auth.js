const express = require('express')
const router = express.Router()
const authlogin = require('../controllers/Controllerlogin')


'auth/login'
router.post("/login", authlogin.login);

module.exports = router
const express = require('express')
const router = express.Router()
const authlogin = require('../controllers/Controllerlogin.js')


                'authlogin/login'
router.post("/login", authlogin.login);

module.exports = router
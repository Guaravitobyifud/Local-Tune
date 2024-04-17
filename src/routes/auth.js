const express = require('express')
const router = express.Router()
const authlogin = require('../controllers/Controllerlogin')


                    'authlogin/login'
router.post("/login", authlogin.login);

module.exports = router
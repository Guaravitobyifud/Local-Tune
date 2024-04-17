const express = require('express')
const router = express.Router()
const authlogin = require('../controllers/Controllerlogin')


                
router.post("/login", authlogin.login);

module.exports = router
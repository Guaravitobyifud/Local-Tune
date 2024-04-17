const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.render('login')
})

router.post('/cadastro', (req, res) => {
    res.render('cadastro')
})

router.post('/index', (req, res) => {
    res.render('index')
})

module.exports = router
const express = require('express')
const router = express.Router()

router.get('/login', (req, res) => {
    res.render('login')
})

router.post('/cadastro', (req, res) => {
    res.render('cadastro')
})

router.get('/', (req, res) => {
    res.render('index')
})

module.exports = router
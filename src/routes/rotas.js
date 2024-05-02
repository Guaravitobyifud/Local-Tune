const express = require('express')
const router = express.Router()
const app = require('../../server')

router.get("/login", (req, res) => {
    res.render("login")
});

router.get("/cadastro", (req, res) => {
    res.render("cadastro")
});

router.get("/cadastroMusico", (req, res) => {
    res.render("cadastroMusico")
});

router.get("/cadastroSTBL", (req, res) => {
    res.render("cadastroSTBL")
});

router.get("/", (req, res) => {
    res.render("index")
});

module.exports = router;
const { connSequelize, BD } = require('../../config/coneccao')
const mysql = require('mysql2')
const express = require('express')
const {tb_estabelecimento} = require ('../models/modeloEstabelecimento')


connSequelize.sync()

async function runServer() {

    let resultBusca =  await tb_estabelecimento.findAll({
        raw: true
    })

    console.log(resultBusca) 
}

runServer()
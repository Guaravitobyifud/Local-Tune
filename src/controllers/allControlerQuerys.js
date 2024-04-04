const { connSequelize, BD } = require('../../config/coneccao')
const {tb_contato} = require ('../models/modeloContato')
const {tb_endereco} = require ('../models/modeloEndereco')
const {tb_estabelecimento} = require ('../models/modeloEstabelecimento')
const {tb_musico} = require ('../models/modeloMusico')
const {tb_tipoUsuario} = require ('../models/modeloTipoUsuario')
const {tb_usuario} = require ('../models/modeloUsuario')

connSequelize.sync()

async function runServer() {

    let resultBusca =  await tb_contato.findAll({
        raw: true
    })

    console.log(resultBusca) 

    resultBusca =  await tb_endereco.findAll({
        raw: true
    })

    console.log(resultBusca) 

    resultBusca =  await tb_usuario.findAll({
        raw: true
    })

    console.log(resultBusca) 
}

runServer()
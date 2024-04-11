const { connSequelize, BD } = require('../../config/coneccao')
const {Model, Op, Sequelize} = require('sequelize')
const {tb_contato} = require ('../models/modeloContato')
const {tb_endereco} = require ('../models/modeloEndereco')
const {tb_estabelecimento} = require ('../models/modeloEstabelecimento')
const {tb_musico} = require ('../models/modeloMusico')
const {tb_tipoMusical} = require ('../models/modeloTipoMusical')
const {tb_tipoUsuario} = require ('../models/modeloTipoUsuario')
const {tb_usuario} = require ('../models/modeloUsuario')

async function runServer() {
    
  
        await connSequelize.sync();

        let resultBuscaContato = await tb_contato.findAll({ 
            raw: true
            });
        console.log("Contatos:", resultBuscaContato);

        let resultBuscaEndereco = await tb_endereco.findAll({
             attributes: [
            'nm_estado', 
            'nm_cidade',
        ],
             group: ['nm_estado', 'nm_cidade'],
             raw: true 
             });

        console.log("Endereços agrupados:", resultBuscaEndereco);

        let resultBuscaMusico = await tb_musico.findAll({
         attributes: [
             'cd_cpf', 
         ],
             order: ['cd_cpf'],
             raw: true 
         });

        console.log("Musicos ordenados pelo CPF:", resultBuscaMusico);

        let resultBuscaEnderecoOG = await tb_endereco.findAll({
         attributes: [
             'nm_estado', 
             'nm_cidade',
         ],
             order: ['nm_estado'],
             group: ['nm_estado', 'nm_cidade'],
             raw: true 
         });

        console.log("Endereços agrupados e ordenados pelo estado:", resultBuscaEnderecoOG); 
        

        let resultBuscaUsuTipoUsu = await tb_usuario.findAll({
            attributes: [
                        [Sequelize.literal('nm_usuario'), "Usuario"],
                        [Sequelize.literal('cd_senha'), "Senha"],
                        [Sequelize.literal('cd_cnpj'), "CNPJ"],
                        [Sequelize.literal('cd_cpf'), "CPF"]
            ],
            include: {
                model: tb_tipoUsuario,
                required: true,
                attributes: [],
                include: [
                    {
                        model: tb_musico,
                        required: false,
                        attributes: []
                    },
                    {
                        model: tb_estabelecimento,
                        required: false,
                        attributes: []
                    }
                ]
            },
            raw: true
        });
        
        console.log(resultBuscaUsuTipoUsu);
        

       let resultBuscaUsuAll = await tb_usuario.findAll({
            attributes: [
                 [Sequelize.literal('nm_usuario'), "Usuario"],
                 [Sequelize.literal('nm_email'), "e-mail"],
                 [Sequelize.literal('cd_senha'), "Senha"],
                 [Sequelize.literal('ds_descricaoTpMusical'), 'Tipo Musical'],
                 [Sequelize.literal('nr_celular'), "Numero de celular"],
                 [Sequelize.literal('cd_cnpj'), "CNPJ"],
                 [Sequelize.literal('cd_cpf'), "CPF"],
                 [Sequelize.literal('nm_estado'), "Estado"],
                 [Sequelize.literal('nm_cidade'), "Cidade"],
                 [Sequelize.literal('nm_estado'), "Rua"],
                 [Sequelize.literal('nm_cidade'), "Numero Residencial"]
],
            include: [
                {
                    model: tb_tipoUsuario,
                    required: true,
                    include:[ {
                        model: tb_musico,
                        required: false,
                        attributes: []
                    },
                    {
                        model: tb_estabelecimento,
                        required: false,
                        attributes: []
                    }, 
                ],

                },
                {
                    model: tb_contato,
                    required: true,
                    attributes: []
                },
                {
                    model: tb_endereco,
                    required: true,
                    attributes: []
                },
                {
                    model: tb_tipoMusical,
                    required: true,
                    attributes: []
                },
            ],
            raw: true
        })
    
        console.log(resultBuscaUsuAll)

        let resultBuscaUsuOG = await tb_usuario.findAll({
            attributes: [
                [Sequelize.literal('nm_usuario'), 'Usuario'], 
                [Sequelize.literal('ds_descricaoTpMusical'), 'Tipo Musical'],
                [Sequelize.fn('COUNT', Sequelize.col('*')), 'QTD Total por Tipo Musical:']
            ],
            include: [          
                {
                    model: tb_tipoMusical,
                    required: true,
                    attributes: []
                },
            ],
            order: ['nm_usuario'],
            group: ['nm_usuario', 'ds_descricaoTpMusical'],
            raw: true
        })
    
        console.log(resultBuscaUsuOG)

}

runServer();

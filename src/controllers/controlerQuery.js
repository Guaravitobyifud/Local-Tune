const { connSequelize, BD } = require('../../config/coneccao')
const { Model, Op, Sequelize } = require('sequelize')
const { tb_contato } = require('../models/modeloContato')
const { tb_endereco } = require('../models/modeloEndereco')
const { tb_tipoMusical } = require('../models/modeloTipoMusical')
const { tb_tipoUsuario } = require('../models/modeloTipoUsuario')
const { tb_usuario } = require('../models/modeloUsuario')
const { tb_usuTipoMus } = require('../models/modeloUsuTipoMus')
const { model } = require('mongoose')
const { tb_bandaMembros } = require('../models/modeloBandaMembros')
const { tb_banda } = require('../models/modeloBanda')

async function runServer() {


    await connSequelize.sync();

    //         let resultBuscaContato = await tb_contato.findAll({ 
    //             raw: true
    //             });
    //         console.log("Contatos:", resultBuscaContato);

    //         let resultBuscaEndereco = await tb_endereco.findAll({
    //              attributes: [
    //             'nm_estado', 
    //             'nm_cidade',
    //         ],
    //              group: ['nm_estado', 'nm_cidade'],
    //              raw: true 
    //              });

    //         console.log("Endereços agrupados:", resultBuscaEndereco);

    //         let resultBuscaMusico = await tb_musico.findAll({
    //          attributes: [
    //              'cd_cpf', 
    //          ],
    //              order: ['cd_cpf'],
    //              raw: true 
    //          });

    //         console.log("Musicos ordenados pelo CPF:", resultBuscaMusico);

    //         let resultBuscaEnderecoOG = await tb_endereco.findAll({
    //          attributes: [
    //              'nm_estado', 
    //              'nm_cidade',
    //          ],
    //              order: ['nm_estado'],
    //              group: ['nm_estado', 'nm_cidade'],
    //              raw: true 
    //          });

    //         console.log("Endereços agrupados e ordenados pelo estado:", resultBuscaEnderecoOG); 


    //         let resultBuscaUsuTipoUsu = await tb_usuario.findAll({
    //             attributes: [
    //                         [Sequelize.literal('nm_usuario'), "Usuario"],
    //                         [Sequelize.literal('cd_senha'), "Senha"],
    //                         [Sequelize.literal('cd_cnpj'), "CNPJ"],
    //                         [Sequelize.literal('cd_cpf'), "CPF"]
    //             ],
    //             include: {
    //                 model: tb_tipoUsuario,
    //                 required: true,
    //                 attributes: [],
    //                 include: [
    //                     {
    //                         model: tb_musico,
    //                         required: false,
    //                         attributes: []
    //                     },
    //                     {
    //                         model: tb_estabelecimento,
    //                         required: false,
    //                         attributes: []
    //                     }
    //                 ]
    //             },
    //             raw: true
    //         });

    //         console.log(resultBuscaUsuTipoUsu);


    //        let resultBuscaUsuAll = await tb_usuario.findAll({
    //             attributes: [
    //                  [Sequelize.literal('nm_usuario'), "Usuario"],
    //                  [Sequelize.literal('nm_email'), "email"],
    //                  [Sequelize.literal('cd_senha'), "Senha"],
    //                  [Sequelize.literal('ds_descricaoTpMusical'), 'Tipo_Musical'],
    //                  [Sequelize.literal('nr_celular'), "Numero_de_celular"],
    //                  [Sequelize.literal('cd_cnpj'), "CNPJ"],
    //                  [Sequelize.literal('cd_cpf'), "CPF"],
    //                  [Sequelize.literal('nm_estado'), "Estado"],
    //                  [Sequelize.literal('nm_cidade'), "Cidade"],
    //                  [Sequelize.literal('nm_rua'), "Rua"],
    //                  [Sequelize.literal('nr_rua'), "Numero_Residencial"]
    // ],
    //             include: [
    //                 {
    //                     model: tb_tipoUsuario,
    //                     required: true,
    //                     attributes: [],
    //                     include:[ {
    //                         model: tb_musico,
    //                         required: false,
    //                         attributes: []
    //                     },
    //                     {
    //                         model: tb_estabelecimento,
    //                         required: false,
    //                         attributes: []
    //                     }, 
    //                 ],

    //                 },
    //                 {
    //                     model: tb_contato,
    //                     required: true,
    //                     attributes: []
    //                 },
    //                 {
    //                     model: tb_endereco,
    //                     required: true,
    //                     attributes: []
    //                 },
    //                 {
    //                     model: tb_tipoMusical,
    //                     required: true,
    //                     attributes: []
    //                 },
    //             ],
    //             raw: true
    //         })

    //         console.log(resultBuscaUsuAll)

    //         let resultBuscaUsuO = await tb_usuario.findAll({
    //             attributes: [
    //                 [Sequelize.literal('ds_descricaoTpMusical'), 'Tipo_Musical'],
    //                 [Sequelize.fn('COUNT', Sequelize.col('ds_descricaoTpMusical')), 'Total de usuarios por tipo musical:']
    //             ],
    //             include: [          
    //                 {
    //                     model: tb_tipoMusical,
    //                     required: true,
    //                     attributes: []
    //                 },
    //             ],

    //             order: [[Sequelize.literal('ds_descricaoTpMusical'), 'DESC']],
    //             group: ['ds_descricaoTpMusical'],
    //             raw: true
    //         })

    //         console.log(resultBuscaUsuO)



    // let resultBuscaBanda = await tb_bandaMembros.findAll({
    //     attributes: [
    //         [Sequelize.literal('nm_usuario'), "Usuario"],
    //         [Sequelize.literal('ds_descricaoTpMusical'), 'Tipo_Musical'],
    //         [Sequelize.literal('nr_celular'), "Numero_de_celular"],
    //         [Sequelize.literal('nm_endereco'), "Endereco"]
    //     ],
    //     include: [
    //         {
    //             model: tb_usuTipoMus,
    //             required: true,
    //             attributes: [],
    //             include: [
    //                 {
    //                     model: tb_usuario,
    //                     required: true,
    //                     attributes: [],
    //                     include: [
    //                         {
    //                             model: tb_contato,
    //                             required: true,
    //                             attributes: []
    //                         },
    //                         {
    //                             model: tb_endereco,
    //                             required: true,
    //                             attributes: []
    //                         },
    //                     ],
    //                 },
    //             ],
    //         },
    //     ],
    //     where: {
    //         cd_banda: {
    //             [Op.eq]: 1
    //         },
    //     },
    //     raw: true
    // });

    // console.log(resultBuscaBanda);


    const busca = 'c'
    let resultBuscaUsu2 = await tb_usuTipoMus.findAll({
        attributes: [
            [Sequelize.literal('nm_usuario'), "Usuario"],
            [Sequelize.literal('nr_celular'), "Numero_de_celular"],
            [Sequelize.literal('nm_endereco'), "Endereco"]
        ],
        include: [
            {
                model: tb_usuario,
                required: true,
                attributes: [],
                include: [
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
                ],
                where: {
                    nm_usuario: {
                        [Op.like]: `${busca}%`
                    },
                },
            },
        ],
        raw: true
    });

    console.log(resultBuscaUsu2);

    let resultBuscaUsuTipoUsu = await tb_usuTipoMus.findAll({
        attributes: [
            [Sequelize.literal('ds_descricaoTpMusical'), 'Tipo_Musical'],
        ],
        include: [
            {
                model: tb_usuario,
                required: true,
                attributes: [],
                where: {
                    nm_usuario: {
                        [Op.like]: `${busca}%`
                    },
                },
            },
            {
                model: tb_tipoMusical,
                required: true,
                attributes: []
            },
        ],
        raw: true
    })

    console.log(resultBuscaUsuTipoUsu)

}



runServer();

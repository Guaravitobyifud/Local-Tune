const { connSequelize, BD } = require('../../config/coneccao')
const {tb_contato} = require ('../models/modeloContato')
const {tb_endereco} = require ('../models/modeloEndereco')
const {tb_estabelecimento} = require ('../models/modeloEstabelecimento')
const {tb_musico} = require ('../models/modeloMusico')
const {tb_tipoMusical} = require ('../models/modeloTipoMusica')
const {tb_tipoUsuario} = require ('../models/modeloTipoUsuario')
const {tb_usuario} = require ('../models/modeloUsuario')

async function runServer() {
    
        // Sincroniza com o banco de dados
        await connSequelize.sync();

        // Executa a primeira consulta
      /*  let resultBuscaContato = await tb_contato.findAll({ 
            raw: true
            });
        console.log("Contatos:", resultBuscaContato);

        // Executa a segunda consulta
        let resultBuscaEndereco = await tb_endereco.findAll({
             attributes: [
            'nm_estado', 
            'nm_cidade',
        ],
             group: ['nm_estado', 'nm_cidade'],
             raw: true 
             });

        console.log("Endereços agrupados:", resultBuscaEndereco);
            } catch (error) {
                 console.error('Ocorreu um erro:', error);
            }

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

        console.log("Endereços agrupados e ordenados pelo estado:", resultBuscaEnderecoOG); */
        

        let resultBuscaUsuTipoUsu = await tb_usuario.findAll({
            include: {
                model: tb_tipoUsuario,
                required: true,
                include: [
                    {
                        model: tb_musico,
                        required: false,
                        attributes: ['cd_musico', 'cd_cpf'] // Seleciona os atributos relevantes do músico
                    },
                    {
                        model: tb_estabelecimento,
                        required: false,
                        attributes: ['cd_estabelecimento', 'cd_cnpj'] // Seleciona os atributos relevantes do estabelecimento
                    }
                ]
            },
            raw: true
        });
        
        console.log(resultBuscaUsuTipoUsu);
        
        
        console.log(resultBuscaUsuTipoUsu);
        
 /*

       let resultBuscaUsuAll = await tb_usuario.findAll({
            include: [
                {
                    model: tb_tipoUsuario,
                    required: true,
                    include:[ {
                        model: tb_musico,
                        required: false,
                    },
                    {
                        model: tb_estabelecimento,
                        required: false,
                    }, 
                ],

                },
                {
                    model: tb_contato,
                    required: true
                },
                {
                    model: tb_endereco,
                    required: true
                },
                {
                    model: tb_tipoMusical,
                    required: true
                },
            ],
            raw: true
        })
    
        console.log(resultBuscaUsuAll)

        let resultBuscaUsuAllOG = await tb_usuario.findAll({
           
            group: ['cd_usuario', 'nm_usuario', 'nm_senha', ],
            raw: true
        })
    
        console.log(resultBuscaUsuAllOG)*/ 

}

runServer();

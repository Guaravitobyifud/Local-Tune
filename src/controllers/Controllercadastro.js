const bcrypt = require('bcryptjs');
const { tb_usuario } = require('../models/modeloUsuario');
const { tb_contato } = require('../models/modeloContato');
const { tb_tipoMusical } = require('../models/modeloTipoMusical');
const { tb_musico } = require('../models/modeloMusico');
const { tb_tipoUsuario } = require('../models/modeloTipoUsuario');


//Rota de cadastro
exports.cadastroUsuario = async (req, res) => {

    try {
        const { nome, email, senhaC } = req.body

        // Verificar se o e-mail já está em uso
        const usuarioExistente = await tb_usuario.findOne({ where: { nm_email: email } })
        if (usuarioExistente) {
            return res.render('cadastro', { message: 'E-mail já está em uso.' })
        }
        else{
        // Criptografar a senha
        const hashSenha = await bcrypt.hash(senhaC, 10)

        const userCriado = await tb_usuario.create({
            cd_tipoUsuario: null,
            nm_email: email,
            nm_usuario: nome,
            cd_endereco: null,
            cd_contato: null,
            cd_tipoMusical: null,
            cd_senha: hashSenha // Armazenar o hash da senha
        })
       if(userCriado){
        res.render('index')
       }
       else{
        res.render('cadastro', {message: 'foi não homi'})
       }
    }
        
        // Aqui você pode enviar uma resposta de sucesso, redirecionar o usuário, etc.
    } catch (error) {
        // Lidar com qualquer erro que possa ocorrer durante o processo de cadastro
        console.error(error);
        res.status(500).send('Erro interno do servidor')
    }
}

exports.cadastroMusico= async (req, res) => {

    try {
        const { nome, email, senhaM, senhaM2, cpf, cellfone, option } = req.body

        // Verificar se o e-mail já está em uso
        const usuarioExistente = await tb_usuario.findOne({ where: { nm_email: email } })
        if (usuarioExistente) {
            return res.render('cadastro', { message: 'E-mail já está em uso.' })
        }
        else{
        // Criptografar a senha
        if(senhaM==senhaM2){
        const hashSenha = await bcrypt.hash(senhaM, 10)


        async function criaPerfilUsuMus() {

        const musicoCriado = await tb_musico.create({
            cd_cpf: cpf
        })

        const tipoUsuCriado = await tb_tipoUsuario.create({
            cd_musico: musicoCriado.cd_musico,
            cd_estabelecimento: null
        })

        const contatoCriado = await tb_contato.create({
            nr_celular: cellfone
        })

        const userCriado = await tb_usuario.create({
            cd_tipoUsuario: tipoUsuCriado.cd_tipoUsuario,
            nm_email: email,
            nm_usuario: nome,
            cd_endereco: null,
            cd_contato: contatoCriado.cd_contato,
            cd_tipoMusical: option,
            cd_senha: hashSenha // Armazenar o hash da senha
        })
        if(userCriado){
            res.render('index')
           }
           else{
            res.render('cadastro', {message: 'foi não homi'})
           }
    }
    
criaPerfilUsuMus()

      
      
    }
    else{
         res.render('cadastroMusico', {message1: 'sexosexosexo'})
    }
}

        // Aqui você pode enviar uma resposta de sucesso, redirecionar o usuário, etc.
    } catch (error) {
        // Lidar com qualquer erro que possa ocorrer durante o processo de cadastro
        console.error(error);
        res.status(500).send('Erro interno do servidor')
    }
}

 exports.cadastroStbl = async (req, res) => {

    try {
        const { nome, email, senhaC } = req.body

        // Verificar se o e-mail já está em uso
        const usuarioExistente = await tb_usuario.findOne({ where: { nm_email: email } })
        if (usuarioExistente) {
            return res.render('cadastro', { message: 'E-mail já está em uso.' })
        }
        else{
        // Criptografar a senha
        const hashSenha = await bcrypt.hash(senhaC, 10)

        const userCriado = await tb_usuario.create({
            cd_tipoUsuario: null,
            nm_email: email,
            nm_usuario: nome,
            cd_endereco: null,
            cd_contato: null,
            cd_tipoMusical: null,
            cd_senha: hashSenha // Armazenar o hash da senha
        })
       if(userCriado){
        res.render('index')
       }
       else{
        res.render('cadastro', {message: 'foi não homi'})
       }
    }
        
        // Aqui você pode enviar uma resposta de sucesso, redirecionar o usuário, etc.
    } catch (error) {
        // Lidar com qualquer erro que possa ocorrer durante o processo de cadastro
        console.error(error);
        res.status(500).send('Erro interno do servidor')
    }
}
    


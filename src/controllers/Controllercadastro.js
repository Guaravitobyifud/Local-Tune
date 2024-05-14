const bcrypt = require('bcryptjs');
const { tb_usuario } = require('../models/modeloUsuario');
const { tb_contato } = require('../models/modeloContato');
const { tb_tipoMusical } = require('../models/modeloTipoMusical');
const { tb_tipoUsuario } = require('../models/modeloTipoUsuario');
const { tb_endereco } = require('../models/modeloEndereco');
const { tb_usuTipoMus } = require('../models/modeloUsuTipoMus');
const { tb_regsLegal } = require('../models/modeloRegsLegal');


//Rota de cadastro
exports.cadastroUsuario = async (req, res) => {

    try {
        const { nome, email, senha, senha2, musicas} = req.body

        // Verificar se o e-mail já está em uso
        const usuarioExistente = await tb_usuario.findOne({ where: { nm_email: email } })
        if (usuarioExistente) {
            return res.render('cadastro', { message: 'E-mail já está em uso.' })
        }
        else {
            if (senha == senha2) {
                // Criptografar a senha
                const hashSenha = await bcrypt.hash(senha, 10)



                const userCriado = await tb_usuario.create({
                    cd_tipoUsuario: 1,
                    nm_email: email,
                    nm_usuario: nome,
                    cd_endereco: null,
                    cd_contato: null,
                    cd_senha: hashSenha // Armazenar o hash da senha
                })

                if (Array.isArray(musicas)) {
                    for (const musica of musicas) {
                        usuTipoMus =  await tb_usuTipoMus.create({
                        cd_tipoMusical: parseInt(musica, 10),
                        cd_usuario: userCriado.cd_usuario
                      });
                    }
                  } else if (musicas) {
                    // Caso apenas um checkbox esteja selecionado, `musicas` não será um array
                    usuTipoMus =  await tb_usuTipoMus.create({
                      cd_tipoMusical: parseInt(musicas, 10),
                      cd_usuario: userCriado.cd_usuario
                    });
                  }

                if (userCriado) {
                    res.render('login')
                }

                else {
                    res.render('cadastro', { message: 'foi não homi' })
                }

            }
            else {
                return res.render('cadastro', { message: 'As senhas tem que ser iguais' })
            }
        }
        // Aqui você pode enviar uma resposta de sucesso, redirecionar o usuário, etc.
    } catch (error) {
        // Lidar com qualquer erro que possa ocorrer durante o processo de cadastro
        console.error(error);
        res.status(500).send('Erro interno do servidor')
    }
}


exports.cadastroMusico = async (req, res) => {

    try {
        const { nome, email, senhaM, senhaM2, cpf, cellfone, option } = req.body

        // Verificar se o e-mail já está em uso
        const usuarioExistente = await tb_usuario.findOne({ where: { nm_email: email } })
        if (usuarioExistente) {
            return res.render('cadastro', { message: 'E-mail já está em uso.' })
        }
        else {
            // Criptografar a senha
            if (senhaM == senhaM2) {
                const hashSenha = await bcrypt.hash(senhaM, 10)


                async function criaPerfilUsuMus() {

                    const registroLegal = await tb_regsLegal.create({
                        cd_cpf: cpf,
                        cd_cnpj: null
                    })

                    const contatoCriado = await tb_contato.create({
                        nr_celular: cellfone
                    })

                    const userCriado = await tb_usuario.create({
                        cd_tipoUsuario: 2,
                        nm_email: email,
                        nm_usuario: nome,
                        cd_regsLegal: registroLegal.cd_regsLegal,
                        cd_endereco: null,
                        cd_contato: contatoCriado.cd_contato,
                        cd_senha: hashSenha // Armazenar o hash da senha
                    })

                    const usuTipoMus = await tb_usuTipoMus.create({
                        cd_tipoMusical: option,
                        cd_usuario: userCriado.cd_usuario
                    })

                    if (usuTipoMus) {
                        res.render('login')
                    }
                    else {
                        res.render('cadastro', { message: 'foi não homi' })
                    }
                }

                criaPerfilUsuMus()

            }
            else {
                res.render('cadastroMusico', { message1: 'sexosexosexo' })
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
        const { nome, email, senha, senha2, cnpj, endereco, cellfone, option } = req.body

        // Verificar se o e-mail já está em uso
        const usuarioExistente = await tb_usuario.findOne({ where: { nm_email: email } })
        if (usuarioExistente) {
            return res.render('cadastro', { message: 'E-mail já está em uso.' })
        }
        else {
            // Criptografar a senha
            if (senha == senha2) {
                const hashSenha = await bcrypt.hash(senha, 10)

                async function criaPerfilUsuSTBL() {

                    const registroLegal = await tb_regsLegal.create({
                        cd_cpf: null,
                        cd_cnpj: cnpj
                    })

                    const enderecoCriado = await tb_endereco.create({
                        nm_endereco: endereco
                    });


                    const contatoCriado = await tb_contato.create({
                        nr_celular: cellfone
                    });

                    const userCriado = await tb_usuario.create({
                        cd_tipoUsuario: 3,
                        nm_email: email,
                        nm_usuario: nome,
                        cd_endereco: enderecoCriado.cd_endereco,
                        cd_regsLegal: registroLegal.cd_regsLegal,
                        cd_contato: contatoCriado.cd_contato,
                        cd_senha: hashSenha // Armazenar o hash da senha
                    });

                    const usuTipoMus = await tb_usuTipoMus.create({
                        cd_tipoMusical: option,
                        cd_usuario: userCriado.cd_usuario
                    })


                    if (usuTipoMus)
                        res.render('login'); // Redireciona para o index se o usuário for cadastrado com sucesso
                }


                criaPerfilUsuSTBL();
            }


            else {
                res.render('cadastroSTBL', { message: 'As senhas não coincidem' });
            }
        }
    }
    catch (error) {
        // Lidar com qualquer erro que possa ocorrer durante o processo de cadastro
        console.error(error);
        res.status(500).send('Erro interno do servidor');
    }
}


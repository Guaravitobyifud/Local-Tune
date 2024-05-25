const bcrypt = require('bcryptjs');
const { tb_usuario } = require('../models/modeloUsuario.js');
const cookie = require('cookie-parser');

exports.login = async (req, res) => {
    console.log(req.body);

    const { email, password } = req.body;

    try {
        const usuario = await tb_usuario.findOne({ where: { nm_email: email } });

        if (usuario) {
            const senhaValida = await bcrypt.compare(password, usuario.cd_senha);
            if (senhaValida) {
                let dadosUsuario = {
                    logado: true,
                    cd_usuario: usuario.cd_usuario, // Corrigido para usar a propriedade do objeto usuário
                    nm_usuario: usuario.nm_usuario,
                    cd_tipoUsuario: usuario.cd_tipoUsuario // Certifique-se que este campo existe na tabela tb_usuario
                };

                switch (dadosUsuario.cd_tipoUsuario) {
                    case 1:
                        dadosUsuario.tipoUsuario = 'usuario_comum';
                        break;
                    case 2:
                        dadosUsuario.tipoUsuario = 'musico';
                        break;
                    case 3:
                        dadosUsuario.tipoUsuario = 'estabelecimento';
                        break;
                    case 4:
                        dadosUsuario.tipoUsuario = 'banda';
                        break;
                    default:
                        dadosUsuario.tipoUsuario = 'desconhecido';
                }

                const dadosUsuarioString = JSON.stringify(dadosUsuario);

                const cookieOptions = {
                    httpOnly: false, // Permite que o cookie seja acessado por JavaScript no navegador
                    maxAge: 2 * 60 * 60 * 1000 // Tempo de vida do cookie em milissegundos (2 horas)
                };

                res.cookie('cookie_login', dadosUsuarioString, cookieOptions);

                res.redirect('/homeUsu'); // Redireciona para a página homeUsu após o login
            } else {
                return res.render('login', { message: 'Email ou senha incorretos' });
            }
        } else {
            return res.render('login', { message: 'Email ou senha incorretos' });
        }
    } catch (error) {
        console.error('Erro no login:', error);
        res.render('login', { message: 'Erro ao realizar login' });
    }
};

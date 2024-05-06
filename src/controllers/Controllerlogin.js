const bcrypt = require('bcryptjs');
const db = require('../../server.js')
const { tb_usuario } = require('../models/modeloUsuario.js');


exports.login = async (req, res) => {
    console.log(req.body);

    const { email, password } = req.body;

    // Buscar usuário pelo e-mail
    try {
        const usuario = await tb_usuario.findOne({ where: { nm_email: email } });

        if (usuario) {
            const senhaValida = await bcrypt.compare(password, usuario.cd_senha);
            if (senhaValida) {
                // let dadosUsuario = {
                //     userId: usuario.cd_usuario,
                //     logado: true,
                //     permissoes: {
                //         papel: 'cliente',
                //         acesso: ['homeUsu', 'perfilUsu']
                //     }
                // }
                // dadosUsuario = JSON.stringify(dadosUsuario)
                // res.cookie('cookie_login', dadosUsuario, {
                //     httpOnly: false
                // })
                req.session.user = {
                    userId: usuario.cd_usuario,
                    username: usuario.nm_usuario,
                    // Outras informações do usuário, se necessário
                };

                res.render('homeUsu', { 
                    username: 'Bem-vindo ' + usuario.nm_usuario,
                    logout: '<h3><a class="bo" href="/logout">logout</a></h3>' 
                });

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

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
                req.session.usuario = usuario
                req.session.autorizado = true
                res.render('index', { username: 'Bem-vindo ' + usuario.nm_usuario });

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

const bcrypt = require('bcryptjs');
const db = require('../../server.js')
const { tb_usuario } = require('../models/modeloUsuario.js');




// Rota de login
exports.login = async (req, res) => {
        console.log(req.body);

        const { email, password} = req.body;

        // Buscar usuário pelo e-mail
        try {
        const usuario = await tb_usuario.findOne({ where: { nm_email: email } });

            if (usuario) {
                const senhaValida = await tb_usuario.findOne({ where: { cd_senha: password } });
                // const senhaValida = await bcrypt.compare({ where: { cd_senha: password } });
                if(senhaValida){
                    res.render('index', { username: 'Bem vindo ' + usuario.nm_usuario });
                    
                }
                else if (!senhaValida) {
                    return  res.render('login', {message: 'Email ou senha Incorretos'})
                }
                
            }
            else {
                return  res.render('login', {message: 'Email ou Senha incorretos'})
            }
        // Comparar a senha informada com a hash salva no banco de dados
        
        // Login bem-sucedido
    } catch (error) {
        console.error('Erro no login:', error);
        res.render('login', {message: 'Erro ao realizar login'})
    }
}
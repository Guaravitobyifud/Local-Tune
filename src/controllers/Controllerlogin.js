const bcrypt = require('bcryptjs');
const db = require('../../server.js')
const { tb_contato } = require('../models/modeloContato.js');
const { tb_usuario } = require('../models/modeloUsuario.js');




// Rota de login
exports.login = async (req, res) => {
        console.log(req.body);

        const { email, password, error } = req.body;

        // Buscar usuário pelo e-mail
        try {
        const usuario = await tb_usuario.findOne({ where: { nm_email: email } });

            if (usuario) {
                const senhaValida = await bcrypt.compare(password, usuario.cd_senha);
                if(senhaValida){
                    return  res.render('index')
                }
        else if (!senhaValida) {
            error.value= `<h1>Usuário ou Senha inválidos<h1>`;
            return res.render('login')
            
        }else {
           return  res.render('login'), {
           message: "Usuario não encontrado"
         }
        }
            }
        // Comparar a senha informada com a hash salva no banco de dados
        
        // Login bem-sucedido
    } catch (error) {
        console.error('Erro no login:', error);
        res.status(500).send('Erro ao realizar login.');
    }
}



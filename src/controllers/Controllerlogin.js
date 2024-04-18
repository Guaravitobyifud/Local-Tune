const bcrypt = require('bcryptjs');
const { tb_contato } = require('../models/modeloContato.js');
const { tb_usuario } = require('../models/modeloUsuario.js');
import '../views/login.hbs'



// Rota de login
exports.login = async (req, res) => {
        console.log(req.body);

        const { email, password } = req.body;

        // Buscar usuário pelo e-mail
        try {
        const usuario = await tb_contato.findOne({ where: { nm_email } });

            if (usuario) {
                return res.redirect('/index')
            }
        if (!usuario) {
            return res.status(404).send('Usuário não encontrado.');
        }

        // Comparar a senha informada com a hash salva no banco de dados
        const senhaValida = await bcrypt.compare(cd_senha, usuario.cd_senha);

        if (!senhaValida) {
            return res.status(401).send('Senha inválida.');
        }else {
           return  res.render('/login'), {
           message: "Usuario não encontrado"
         }
        }
        // Login bem-sucedido
    } catch (error) {
        console.error('Erro no login:', error);
        res.status(500).send('Erro ao realizar login.');
    }
}



const express = require('express');
const router = express.Router();
const app = express();
const bcrypt = require('bcryptjs');
const { tb_usuario } = require('../models/modeloUsuario.js');


// Rota de login
exports.login = async (req, res) => {
        console.log(req.body);

        const { nm_email, cd_senha } = req.body;

        // Buscar usuário pelo e-mail
        try {
        const usuario = await tb_usuario.findOne({ where: { nm_email } });

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

// Exporte o roteador 
module.exports = router;

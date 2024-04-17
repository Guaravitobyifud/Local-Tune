const bcrypt = require('bcryptjs');
const { tb_usuario } = require('../models/modeloUsuario');
const { tb_contato } = require('../models/modeloContato');


//Rota de cadastro
exports.cadastro = async (req,res) =>{
    console.log(req.body);

    //Verificar se o usuário já existe
    try {
        const usuario = await tb_contato.findOne({ where: { nm_email } });

            if (usuario) {
                return res.status(404).send('E-mail e Senha inválido');
            }
        if (!usuario) {
            send('E-mail e Senha inválido');
            return res.redirect('/index')
        }
    }
catch (error) {
    console.error('Erro no login:', error);
    res.status(500).send('Erro ao realizar login.');
}
}
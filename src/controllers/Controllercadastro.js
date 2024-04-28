const bcrypt = require('bcryptjs');
const { tb_usuario } = require('../models/modeloUsuario');
const { tb_contato } = require('../models/modeloContato');


//Rota de cadastro
exports.cadastroUsuario = async (req,res) =>{

    try {
        const { nome, email, senha } = req.body;

        // Verificar se o e-mail já está em uso
        const usuarioExistente = await tb_usuario.findOne({ where: { nm_email: email } });
        if (usuarioExistente) {
            return res.render('cadastro', { message: 'E-mail já está em uso.' });
        }

        // Criptografar a senha
        const hashSenha = await bcrypt.hash(senha, 10);

         // Inserir dados na tabela
         const query = "INSERT INTO tb_usuario (cd_tipousuario, nm_usuario, nm_email, cd_senha) VALUES (?, ?, ?)";
        
         // Executar a consulta
         connection.query(query, [,nome, email, hashSenha], (error, results, fields) => {
             if (error) {
                 console.error('Erro ao cadastrar usuário:', error);
                 res.render('cadastro', { message: 'Erro ao cadastrar usuário.' });
             } else {
                 console.log('Usuário cadastrado com sucesso!');
                 res.render('cadastro', { message: 'Usuário cadastrado com sucesso!' });
             }
    })
        // Redirecionar ou renderizar página de sucesso
        res.render('cadastro', { message: 'Cadastro realizado com sucesso.' });
    } catch (error) {
        console.error('Erro no cadastro:', error);
        res.status(500).send('Erro ao realizar cadastro.');
    }
}

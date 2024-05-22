//TESTES SOMENTE TESTES
const { tb_img } = require('../models/modeloIMG.js');
const {tb_usuário} = require('../models/modeloUsuario.js')


module.exports = {
    uploadFotoPerfil: async (req, resp) => {
        
    /*  >>> AVISO IMPORTANTE: <<<
        Essa versão do controller de upload
        mostra como armazenar IMAGENS dentro 
        de tabelas!!! Mas não é usada pelo sistema!!!

        Também, o campo "ds_dadoBrutoArquivoImgPerfil"
        da tabela de autenticação do banco de dados
        foi DESATIVADO, será necessário reativá-lo
        para usar essa funcionalidade.

        Cuidado com o tamanho da imagem armazenada!!!
    */

    const MENSAGENS = {
        NO_FILE_FOUND: 'Você deve selecionar um arquivo! Não havia nenhum!',
        FILE_FOUND: 'Arquivo encontrado no corpo da Requisição:',
        UPLOAD_SUCCEEDED: 'Upload de imagem realizado com sucesso.'
    }

    try {          
        if (req.file == undefined)
            return resp.send(MENSAGENS.NO_FILE_FOUND)

        console.log(
            MENSAGENS.FILE_FOUND, req.file)

        const nm_imagem = req.file.filename
        /* 
           >>> AVISO 02: <<< 
           Caso você deseje armazenar a imagem dentro da
           tabela, use esse código abaixo p/ ler a foto
           armazenada pelo MULTER: 
        */

        const fotoUsuarioArmazenada = _fileSystem.readFileSync(
            __basedir +
            "../uploads" +
            nm_imagem
        )
        const cd_usuario = req.cookies.cookie_login.cd_usuario;

        const dadosAuthUser = await tb_usuário.findOne({
            where: { cd_usuario: cd_usuario }
        });

        dadosAuthUser.nm_tipoArquivoImgPerfil = req.file.mimetype
        dadosAuthUser.nm_imagem = nm_imagem


        /* 
           >>> AVISO 03: <<< 
           Caso você deseje armazenar a imagem dentro da
           tabela, insira a IMAGEM BRUTA dentro da tabela
           de autenticação do usuário: 
        */

        // dadosAuthUser.ds_dadoBrutoArquivoImgPerfil = fotoUsuarioArmazenada
        
        await dadosAuthUser.save()
        
        return resp.json({ 
            status_upload: MENSAGENS.UPLOAD_SUCCEEDED,
            nm_imagem: dadosAuthUser.nm_imagem 
        })
    }
    catch(erro) {
        console.log(erro)
        return resp.send(
            `Erro ao tentar fazer upload da foto de Perfil: ${erro}`
        )
    }
}
}
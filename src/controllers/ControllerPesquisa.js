const {Op, Sequelize} = require('sequelize')
const {tb_contato} = require ('../models/modeloContato')
const {tb_endereco} = require ('../models/modeloEndereco')
const {tb_tipoMusical} = require ('../models/modeloTipoMusical')
const {tb_usuario} = require ('../models/modeloUsuario')


exports.Pesquisa = async (req,res) =>{
    console.log(req.body);

    const {busca} =  req.body;
try{

  let resultBuscaUsu2 = await tb_usuario.findAll({
        attributes: [
             [Sequelize.literal('nm_usuario'), "Usuario"],
             [Sequelize.literal('ds_descricaoTpMusical'), 'Tipo_Musical'],
             [Sequelize.literal('nr_celular'), "Numero_de_celular"],
             [Sequelize.literal('nm_endereco'), "Endereco"]
            ],
            include: [
                {
                    model: tb_contato,
                    required: true,
                    attributes: []
                },
                {
                    model: tb_endereco,
                    required: true,
                    attributes: []
                },
                {
                    model: tb_tipoMusical,
                    required: true,
                    attributes: []
                },
            ],
            where: {
                nm_usuario: {
                    [Op.like]: `${busca}%`
                },
            },
            raw: true
        });

        console.log(resultBuscaUsu2);
        res.status(200).json(resultBuscaUsu2);
    } catch (error) {
        console.error(error); // Imprime o erro real para facilitar a depuração
        res.status(500).send('Internal Server Error');
    }
}

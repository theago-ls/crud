const Pessoa = require('../models/Pessoa');

module.exports = {
    async index(req, res){
        const pessoas = await Pessoa.find({});
        return res.json(pessoas);
    },

    async store(req, res){
        const { nome, sobrenome, dataNiver } = req.body;

        const pessoaExists = await Pessoa.findOne({
            nome,
            sobrenome,
        });

        if(pessoaExists){
            return res.json(pessoaExists);
        }

        const pessoa = await Pessoa.create({
            nome,
            sobrenome,
            niver: dataNiver
        });

        return res.json(pessoa);
    }
};
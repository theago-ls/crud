const { Schema, model } = require('mongoose');

const PessoaSchema = new Schema({
    nome: {
        type: String,
        required: true,
    },
    sobrenome: {
        type: String,
        required: true,
    },
    niver: {
        type: String,
        required: true,
    }
});

module.exports = model('Pessoa', PessoaSchema);
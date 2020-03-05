const { Schema, model } = require('mongoose');

const MedicoSchema = new Schema({
    CRM: {
        type: String,
        require: true,
    },

    CPF: {
        type: String,
        required: true,
    },

    nome: {
        type: String,
        required: true,
    },

    sexo: {
        type: String,
        required: true,
    },

    telefone: {
        type: String,
        required: true,
    },

    dataNascimento: {
        type: String,
        required: true
    },

    dataAdmissao: {
        type: String,
        required: true
    },

    endereco: {
        logradouro: {
            type: String,
            required: true,
        },
    
        numero: {
            type: String,
            required: true,
        },
    
        complemento: {
            type: String,
        },
    
        cep: {
            type: String,
            required: true,
        },
    
        bairro: {
            type: String,
            required: true
        },
    
        cidade: {
            type: String,
            required: true
        },
    
        estado: {
            type: String,
            required: true
        },
    },

    area: {
        type: String,
        required: true,
    }
});

module.exports = model('Medico', MedicoSchema);
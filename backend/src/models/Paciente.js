const { Schema, model } = require('mongoose');

const PacienteSchema = new Schema({
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
        required: true,
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

    diagnostico: {
        medico: {
            type: Schema.Types.ObjectId,
            ref: 'Medico',
            required: true,
        },   
    
        doenca: {
            type: String,
            required: true,
        },
    
        estagio: {
            type: String,
            required: true,
        },
    
        observacao: {
            type: String,
        },
    
        data: {
            type: String,
            required: true
        },       
    },
});

module.exports = model('Paciente', PacienteSchema);
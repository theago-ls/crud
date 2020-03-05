const { Schema, model } = require('mongoose');

const DiagnosticoSchema = new Schema({
    medico: {
        type: Schema.Types.ObjectId,
        ref: 'Medico',
        required: true,
    },

    paciente: {
        type: Schema.Types.ObjectId,
        ref: 'Paciente',
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
    }
});

module.exports = model('Diagnostico', DiagnosticoSchema);
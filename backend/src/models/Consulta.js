const { Schema, model } = require('mongoose');

const ConsultaSchema = new Schema({
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

    data: {
        type: String,
        required: true,
    },

    horario: {
        type: String,
        required: true,
    },

    tipo: {
        type: String,
        required: true
    }
});

module.exports = model('Consulta', ConsultaSchema);
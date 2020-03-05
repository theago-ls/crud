const { Schema, model } = require('mongoose');

const TurnoSchema = new Schema({
    CPF: {
        type: String,
        required: true,
    },

    entrada: {
        type: String,
        required: true,
    },

    saida: {
        type: String,
        required: true,
    },
});

module.exports = model('Turno', TurnoSchema);
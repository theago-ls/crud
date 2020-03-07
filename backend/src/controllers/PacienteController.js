const Paciente = require('../models/Paciente');

module.exports = {
    async index(req, res) {
        try {
            const pacientes = await Paciente.find({});
            return res.json(pacientes);
        } catch (err) {
            throw err;
        }
    },

    async store(req, res) {
        const { CPF } = req.body;
        const novoPaciente = req.body;

        try {
            const pacienteExists = await Paciente.findOne({
                CPF
            });

            if (pacienteExists) {
                return res.json(pacienteExists);
            }
        } catch (err) {
            throw err;
        }

        try {
            const newPaciente = await Paciente.create(novoPaciente);

            if (newPaciente)
                return res.json(newPaciente);
            else
                return res.json({ 'message': 'Paciente não foi salvo!' });
        } catch (err) {
            throw err;
        }
    },

    async update(req, res) {
        const { CPF } = req.body;
        const novoPaciente = req.body;

        try {
            const pacienteExists = await Paciente.findOneAndUpdate({
                CPF
            }, novoPaciente, { new: true });

            if (pacienteExists)
                return res.json(pacienteExists);
            else
                return res.json({ 'message': 'Paciente não encontrado!' });
        } catch (err) {
            throw err;
        }
    },

    async delete(req, res) {
        const delPaciente = req.body;

        try {
            const deletedPaciente = await Paciente.findOneAndDelete(delPaciente);

            if (deletedPaciente)
                return res.json(deletedPaciente);
            else
                return res.json({ 'message': 'Paciente não encontrado!' });
        } catch (err) {
            throw err;
        }
    },

    async search(req, res) {
        const { CPF } = req.body;

        try {
            const pacienteExists = await Paciente.findOne({
                CPF
            });

            if (pacienteExists)
                return res.json(newPaciente);
            else
                return res.json({ 'message': 'Paciente não encontrado!' });
        } catch (err) {
            throw err;
        }
    }
};
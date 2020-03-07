const Diagnostico = require('../models/Diagnostico');

module.exports = {
    async index(req, res) {
        try {
            const diagnosticos = await Diagnostico.find({});
            return res.json(diagnosticos);
        } catch (err) {
            throw err;
        }
    },

    async store(req, res) {
        const { medico, paciente } = req.body;
        const novoDiagnostico = req.body;

        try {
            const diagnosticoExists = await Diagnostico.findOne({
                medico,
                paciente,
            });

            if (diagnosticoExists) {
                return res.json(diagnosticoExists);
            }
        } catch (err) {
            throw err;
        }

        try {
            const newDiagnostico = await Diagnostico.create(novoDiagnostico);

            if (newDiagnostico)
                return res.json(newDiagnostico);
            else
                return res.json({ 'message': 'Diagnóstico não foi salvo!' });
        } catch (err) {
            throw err;
        }
    },

    async update(req, res) {
        const { medico, paciente } = req.body;
        const novoDiagnostico = req.body;

        try {
            const diagnosticoExists = await Diagnostico.findOneAndUpdate({
                medico,
                paciente,
            }, novoDiagnostico, { new: true });

            if (diagnosticoExists)
                return res.json(diagnosticoExists);
            else
                return res.json({ 'message': 'Diagnóstico não encontrado!' });
        } catch (err) {
            throw err;
        }
    },

    async delete(req, res) {
        const delDiagnostico = req.body;

        try {
            const deletedDiagnostico = await Diagnostico.findOneAndDelete(delDiagnostico);

            if (deletedDiagnostico)
                return res.json(deletedDiagnostico);
            else
                return res.json({ 'message': 'Diagnóstico não encontrado!' });
        } catch (err) {
            throw err;
        }
    },

    async search(req, res) {
        const { medico, paciente } = req.body;

        try {
            const diagnosticoExists = await Diagnostico.findOne({
                medico,
                paciente,
            });

            if (diagnosticoExists)
                return res.json(newdiagnostico);
            else
                return res.json({ 'message': 'Diagnóstico não encontrado!' });
        } catch (err) {
            throw err;
        }
    }
};
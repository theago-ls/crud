const Medico = require('../models/Medico');

module.exports = {
    async index(req, res) {
        try {
            const medicos = await Medico.find({});
            return res.json(medicos);
        } catch (err) {
            throw err;
        }
    },

    async store(req, res) {
        const { CRM } = req.body;
        const novoMedico = req.body;

        try {
            const medicoExists = await Medico.findOne({
                CRM
            });

            if (medicoExists) {
                return res.json(medicoExists);
            }
        } catch (err) {
            throw err;
        }

        try {
            const newMedico = await Medico.create(novoMedico);

            if (newMedico)
                return res.json(newMedico);
            else
                return res.json({ 'message': 'Médico não foi salvo!' });
        } catch (err) {
            throw err;
        }
    },

    async update(req, res) {
        const { CRM } = req.body;
        const novoMedico = req.body;

        try {
            const medicoExists = await Medico.findOneAndUpdate({
                CRM,
            }, novoMedico, { new: true });

            if (medicoExists)
                return res.json(medicoExists);
            else
                return res.json({ 'message': 'Médico não encontrado!' });
        } catch (err) {
            throw err;
        }
    },

    async delete(req, res) {
        const delMedico = req.body;

        try {
            const deletedMedico = await Medico.findOneAndDelete(delMedico);

            if (deletedMedico)
                return res.json(deletedMedico);
            else
                return res.json({ 'message': 'Médico não encontrado!' });
        } catch (err) {
            throw err;
        }
    },

    async search(req, res) {
        const { CRM } = req.body;

        try {
            const medicoExists = await Medico.findOne({
                CRM,
            });

            if (medicoExists) {
                return res.json(newMedico);
            } else
                return res.json({ 'message': 'Médico não encontrado!' });
        } catch (err) {
            throw err;
        }
    }
};
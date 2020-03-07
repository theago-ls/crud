const Enfermeiro = require('../models/Enfermeiro');

module.exports = {
    async index(req, res) {
        try {
            const enfermeiros = await Enfermeiro.find({});
            return res.json(enfermeiros);
        } catch (err) {
            throw err;
        }
    },

    async store(req, res) {
        const { CPF } = req.body;
        const novoEnfermeiro = req.body;

        try {
            const enfermeiroExists = await Enfermeiro.findOne({
                CPF
            });

            if (enfermeiroExists) {
                return res.json(enfermeiroExists);
            }
        } catch (err) {
            throw err;
        }

        try {
            const newEnfermeiro = await Enfermeiro.create(novoEnfermeiro);

            if (newEnfermeiro)
                return res.json(newEnfermeiro);
            else
                return res.json({ 'message': 'Enfermeiro não foi salvo!' });
        } catch (err) {
            throw err;
        }
    },

    async update(req, res) {
        const { CPF } = req.body;
        const novoEnfermeiro = req.body;

        try {
            const enfermeiroExists = await Enfermeiro.findOneAndUpdate({
                CPF,
            }, novoEnfermeiro, { new: true });

            if (enfermeiroExists)
                return res.json(enfermeiroExists);
            else
                return res.json({ 'message': 'Enfermeiro não encontrado!' });
        } catch (err) {
            throw err;
        }
    },

    async delete(req, res) {
        const delEnfermeiro = req.body;

        try {
            const deletedEnfermeiro = await Enfermeiro.findOneAndDelete(delEnfermeiro);

            if (deletedEnfermeiro)
                return res.json(deletedEnfermeiro);
            else
                return res.json({ 'message': 'Enfermeiro não encontrado!' });
        } catch (err) {
            throw err;
        }
    },

    async search(req, res) {
        const { CPF } = req.body;

        try {
            const enfermeiroExists = await Enfermeiro.findOne({
                CPF
            });

            if (enfermeiroExists)
                return res.json(newEnfermeiro);
            else
                return res.json({ 'message': 'Enfermeiro não encontrado!' });
        } catch (err) {
            throw err;
        }
    }
};
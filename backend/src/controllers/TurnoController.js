const Turno = require('../models/Turno');

module.exports = {
    async index(req, res) {
        try {
            const turnos = await Turno.find({});
            return res.json(turnos);
        } catch (err) {
            throw err;
        }
    },

    async store(req, res) {
        const { CPF } = req.body;
        const novoTurno = req.body;

        try {
            const turnoExists = await Turno.findOne({
                CPF
            });

            if (turnoExists) {
                return res.json(turnoExists);
            }
        } catch (err) {
            throw err;
        }

        try {
            const newTurno = await Turno.create(novoTurno);

            if (newTurno)
                return res.json(newTurno);
            else
                return res.json({ 'message': 'Turno não foi salvo!' });
        } catch (err) {
            throw err;
        }
    },

    async update(req, res) {
        const { CPF } = req.body;
        const novoTurno = req.body;

        try {
            const turnoExists = await Turno.findOneAndUpdate({
                CPF
            }, novoTurno, { new: true });

            if (turnoExists)
                return res.json(turnoExists);
            else
                return res.json({ 'message': 'Turno não encontrado!' });
        } catch (err) {
            throw err;
        }
    },

    async delete(req, res) {
        const delTurno = req.body;

        try {
            const deletedTurno = await Turno.findOneAndDelete(delTurno);

            if (deletedTurno)
                return res.json(newTurno);
            else
                return res.json({ 'message': 'Turno não encontrado!' });
        } catch (err) {
            throw err;
        }
    },
};
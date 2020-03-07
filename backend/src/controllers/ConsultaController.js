const Consulta = require('../models/Consulta');

module.exports = {
    async index(req, res) {
        try {
            const consultas = await Consulta.find({}).populate('medico', 'nome').populate('paciente', 'nome');
            return res.json(consultas);
        } catch (err) {
            throw err;
        }
    },

    async store(req, res) {
        const { medico, paciente, horario } = req.body;
        const novaConsulta = req.body;

        try {
            const consultaExists = await Consulta.findOne({
                medico,
                paciente,
                horario
            });

            if (consultaExists) {
                return res.json(consultaExists);
            }
        } catch (err) {
            throw err;
        }        

        try {
            const newConsulta = await Consulta.create(novaConsulta);

            if (newConsulta)
                return res.json(newConsulta);
            else
                return res.json({ 'message': 'Consulta não foi salva!' });
        } catch (err) {
            throw err;
        }
    },

    async update(req, res) {
        const { medico, paciente, horario } = req.body;
        const novaConsulta = req.body;

        try {
            const consultaExists = await Consulta.findOneAndUpdate({
                medico,
                paciente,
                horario
            }, novaConsulta, { new: true });

            if (consultaExists)
                return res.json(consultaExists);
            else
                return res.json({ 'message': 'Consulta não encontrada!' });
        } catch (err) {
            throw err;
        }
    },

    async delete(req, res) {
        const delConsulta = req.body;

        try {
            const deletedConsulta = await Consulta.findOneAndDelete(delConsulta);

            if (deletedConsulta)
                return res.json(deletedConsulta);
            else
                return res.json({ 'message': 'Consulta não encontrada!' });
        } catch (err) {
            throw err;
        }
    },

    async search(req, res) {
        const { medico, paciente, horario } = req.body;

        try {
            const consultaExists = await Consulta.findOne({
                medico,
                paciente,
                horario
            });

            if (consultaExists)
                return res.json(newConsulta);
            else
                return res.json({ 'message': 'Consulta não encontrada!' });
        } catch (err) {
            throw err;
        }
    }
};
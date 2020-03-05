const Consulta = require('../models/Consulta');

module.exports = {
    async index(req, res){
        const consultas = await Consulta.find({});
        return res.json(consultas);
    },

    async store(req, res){
        const {medico, paciente, horario} = req.body;
        const novaConsulta = req.body;
    
        const consultaExists = await Consulta.findOne({
            medico,
            paciente,
            horario
        });
    
        if(consultaExists){
            return res.json(consultaExists);
        }
    
        const newConsulta = await Consulta.create(novaConsulta);
        
        if(newConsulta)
            return res.json(newConsulta);
        else
            return res.json({"message": 'Consulta não foi salva!'});
    },

    async update(req, res){
        const {medico, paciente, horario} = req.body;
        const novaConsulta = req.body;

        const consultaExists = await Consulta.findOneAndUpdate({
            medico,
            paciente,
            horario
        }, novaConsulta, { new: true });

        if(consultaExists)
            return res.json(consultaExists);
        else
            return res.json({"message": 'Consulta não encontrada!'});
    },

    async delete(req, res){
        const novaConsulta = req.body;

        if(consultaExists){
            const newConsulta = await Consulta.findOneAndDelete(novaConsulta);
            
            return res.json(newConsulta);
        }else
            return res.json({"message": 'Consulta não encontrada!'});
    },

    async search(req, res){
        const {medico, paciente, horario} = req.body;

        const consultaExists = await Consulta.findOne({
            medico,
            paciente,
            horario
        });

        if(consultaExists)           
            return res.json(newConsulta);
        else
            return res.json({"message": 'Consulta não encontrada!'}); 
    }
};
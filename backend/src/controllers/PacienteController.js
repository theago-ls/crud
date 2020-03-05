const Paciente = require('../models/Paciente');

module.exports = {
    async index(req, res){
        const pacientes = await Paciente.find({});
        return res.json(pacientes);
    },

    async store(req, res){
        const { CPF } = req.body;
        const novoPaciente = req.body;
    
        const pacienteExists = await Paciente.findOne({
            CPF
        });
    
        if(pacienteExists){
            return res.json(pacienteExists);
        }
    
        const newPaciente = await Paciente.create(novoPaciente);
    
        if(newPaciente)
            return res.json(newPaciente);
        else
            return res.json({"message": 'Paciente não foi salvo!'});    
    },

    async update(req, res){
        const { CPF } = req.body;

        const pacienteExists = await Paciente.findOneAndUpdate({
            CPF
        }, novoPaciente, { new: true });

        if(pacienteExists)
            return res.json(pacienteExists);
        else
            return res.json({"message": 'Enfermeiro não encontrado!'});       
    },

    async delete(req, res){
        const novoPaciente = req.body;

        if(pacienteExists){
            const newPaciente = await Paciente.findOneAndDelete(novoPaciente);
            
            return res.json(newPaciente);
        }else
            return res.json({"message": 'Paciente não encontrado!'});       
    },

    async search(req, res){
        const { CPF } = req.body;

        const pacienteExists = await Paciente.findOne({
            CPF
        });

        if(pacienteExists)         
            return res.json(newPaciente);
        else
            return res.json({"message": 'Paciente não encontrado!'});       
    }
};
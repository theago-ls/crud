const Diagnostico = require('../models/Diagnostico');

module.exports = {
    async index(req, res){
        const diagnosticos = await Diagnostico.find({});
        return res.json(diagnosticos);
    },

    async store(req, res){
        const {medico, paciente} = req.body;
        const novoDiagnostico = req.body;
    
        const diagnosticoExists = await Diagnostico.findOne({
            medico,
            paciente,           
        });
    
        if(diagnosticoExists){
            return res.json(diagnosticoExists);
        }
    
        const newDiagnostico = await Diagnostico.create(novoDiagnostico);
        
        if(newDiagnostico)
            return res.json(newDiagnostico);
        else
            return res.json({"message": 'Diagnóstico não foi salvo!'}); 
    },

    async update(req, res){
        const {medico, paciente} = req.body;
        const novoDiagnostico = req.body;

        const diagnosticoExists = await Diagnostico.findOneAndUpdate({
            medico,
            paciente,           
        }, novoDiagnostico, { new: true });

        if(diagnosticoExists)
            return res.json(diagnosticoExists);
        else
            return res.json({"message": 'Diagnóstico não encontrado!'}); 
    },

    async delete(req, res){
        const novoDiagnostico = req.body;

        if(diagnosticoExists){
            const newdiagnostico = await Diagnostico.findOneAndDelete(novoDiagnostico);
            
            return res.json(newdiagnostico);
        }else
            return res.json({"message": 'Diagnóstico não encontrado!'}); 
    },

    async search(req, res){
        const {medico, paciente} = req.body;

         const diagnosticoExists = await Diagnostico.findOne({
            medico,
            paciente,          
        });

        if(diagnosticoExists)           
            return res.json(newdiagnostico);
        else
            return res.json({"message": 'Diagnóstico não encontrado!'}); 
    }
};
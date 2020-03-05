const Medico = require('../models/Medico');

module.exports = {
    async index(req, res){
        const medicos = await Medico.find({});
        return res.json(medicos);
    },

    async store(req, res){
        const {CRM} = req.body;
        const novoMedico = req.body;
    
        const medicoExists = await Medico.findOne({
            CRM           
        });
    
        if(medicoExists){
            return res.json(medicoExists);
        }
        
        const newMedico = await Medico.create(novoMedico);
        
        if(newMedico)
            return res.json(newMedico);
        else
            return res.json({"message": 'Médico não foi salvo!'});    
    },

    async update(req, res){
        const {CRM} = req.body;
        const novoMedico = req.body;

        const medicoExists = await Medico.findOneAndUpdate({
            CRM,           
        }, novoMedico, { new: true });

        if(medicoExists)
            return res.json(medicoExists);
        else
            return res.json({"message": 'Médico não encontrado!'}); 
    },

    async delete(req, res){
        const novoMedico = req.body;
      
        if(medicoExists){
            const newMedico = await Medico.findOneAndDelete(novoMedico);
            
            return res.json(newMedico);
        }else
            return res.json({"message": 'Médico não encontrado!'}); 
    },

    async search(req, res){
        const { CRM } = req.body;

        const medicoExists = await Medico.findOne({
            CRM,          
        });

        if(medicoExists){         
            return res.json(newMedico);
        }else
            return res.json({"message": 'Médico não encontrado!'}); 
    }
};
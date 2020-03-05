const Enfermeiro = require('../models/Enfermeiro');

module.exports = {
    async index(req, res){
        const enfermeiros = await Enfermeiro.find({});
        return res.json(enfermeiros);
    },

    async store(req, res){
        const {CPF} = req.body;
        const novoEnfermeiro = req.body;
    
        const enfermeiroExists = await Enfermeiro.findOne({
            CPF           
        });
    
        if(enfermeiroExists){
            return res.json(enfermeiroExists);
        }
    
        const newEnfermeiro = await Enfermeiro.create(novoEnfermeiro);
    
        if(newEnfermeiro)
            return res.json(newEnfermeiro);
        else
            return res.json({"message": 'Enfermeiro não foi salvo!'});            
    },

    async update(req, res){
        const {CPF} = req.body;
        const novoEnfermeiro = req.body;

        const enfermeiroExists = await Enfermeiro.findOne({
            CPF,           
        }, novoEnfermeiro, { new: true });

        if(enfermeiroExists)
            return res.json(enfermeiroExists);
        else
            return res.json({"message": 'Enfermeiro não encontrado!'});            
    },

    async delete(req, res){
        const delEnfermeiro = req.body;
      
        if(enfermeiroExists){
            const newEnfermeiro = await Enfermeiro.findOneAndDelete(delEnfermeiro);
            
            return res.json(newEnfermeiro);
        }else
            return res.json({"message": 'Enfermeiro não encontrado!'});        
    },

    async search(req, res){
        const novoEnfermeiro = req.body;

        if(enfermeiroExists){
            const newEnfermeiro = await Enfermeiro.findOneAndDelete(novoEnfermeiro);
            
            return res.json(newEnfermeiro);
        }else
            return res.json({"message": 'Enfermeiro não encontrado!'});       
    }
};
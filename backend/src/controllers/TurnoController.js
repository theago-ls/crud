const Turno = require('../models/Turno');

module.exports = {
    async index(req, res){
        const turnos = await Turno.find({});
        return res.json(turnos);
    },

    async store(req, res){
        const { CPF } = req.body;
        const novoTurno = req.body;
    
        const turnoExists = await Turno.findOne({
            CPF
        });
    
        if(turnoExists){
            return res.json(turnoExists);
        }
    
        const newTurno = await Turno.create(novoTurno);
        
        if(newTurno)
            return res.json(newTurno);
        else
            return res.json({"message": 'Turno não foi salvo!'});
    },

    async update(req, res){
        const { CPF } = req.body;
        const novoTurno = req.body;

        const turnoExists = await Turno.findOneAndUpdate({
            CPF
        }, novoTurno, { new: true });

        if(turnoExists)
            return res.json(turnoExists);
        else
            return res.json({"message": 'Turno não encontrado!'});
    },

    async delete(req, res){
        const novoTurno = req.body;

        if(turnoExists){
            const newTurno = await Turno.findOneAndDelete(novoTurno);
            
            return res.json(newTurno);
        }else
            return res.json({"message": 'Turno não encontrado!'});
    },

    async search(req, res){
        const { CPF } = req.body;

         const turnoExists = await Turno.findOne({
            CPF
        });

        if(turnoExists)        
            return res.json(newTurno);
        else
            return res.json({"message": 'Turno não encontrado!'});
    }
};
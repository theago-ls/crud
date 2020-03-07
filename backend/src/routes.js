const express = require('express');
const ConsultaController = require('./controllers/ConsultaController');
const PacienteController = require('./controllers/PacienteController');
const MedicoController = require('./controllers/MedicoController');
const EnfermeiroController = require('./controllers/EnfermeiroController');
const DiagnosticoController = require('./controllers/DiagnosticoController');
const TurnoController = require('./controllers/TurnoController');

const routes = express.Router();

//Consultas
routes.get('/consultas', ConsultaController.index);
routes.post('/consultas/add', ConsultaController.store);
routes.post('/consultas/update', ConsultaController.update);
routes.post('/consultas/delete', ConsultaController.delete);
routes.post('/consultas/search', ConsultaController.search);

//Pacientes
routes.get('/pacientes', PacienteController.index);
routes.post('/pacientes/add', PacienteController.store);
routes.post('/pacientes/update', PacienteController.update);
routes.post('/pacientes/delete', PacienteController.delete);
routes.post('/pacientes/search', PacienteController.search);


//Enfermeiros
routes.get('/enfermeiros', EnfermeiroController.index);
routes.post('/enfermeiros/add', EnfermeiroController.store);
routes.post('/enfermeiros/update', EnfermeiroController.update);
routes.post('/enfermeiros/delete', EnfermeiroController.delete);
routes.post('/enfermeiros/search', EnfermeiroController.search);


//Médicos
routes.get('/medicos', MedicoController.index);
routes.post('/medicos/add', MedicoController.store);
routes.post('/medicos/update', MedicoController.update);
routes.post('/medicos/delete', MedicoController.delete);
routes.post('/medicos/search', MedicoController.search);


//Diagnósticos
routes.get('/diagnosticos', DiagnosticoController.index);
routes.post('/diagnosticos/add', DiagnosticoController.store);
routes.post('/diagnosticos/delete', DiagnosticoController.delete);
routes.post('/diagnosticos/search', DiagnosticoController.search);


//Turnos
routes.get('/turnos', TurnoController.index);
routes.post('/turnos/add', TurnoController.store);
routes.post('/turnos/delete', TurnoController.delete);

module.exports = routes;
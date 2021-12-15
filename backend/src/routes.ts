const express = require('express');
const AppointmentController = require('./controllers/AppointmentController');
const PatientController = require('./controllers/PatientController');
const DoctorController = require('./controllers/DoctorController');
const NurseController = require('./controllers/NurseController');
const ShiftController = require('./controllers/ShiftController');

const routes = express.Router();

routes.get('/appointment', AppointmentController.index);
routes.post('/appointment/add', AppointmentController.store);
routes.patch('/appointment/update', AppointmentController.update);
routes.delete('/appointment/delete', AppointmentController.delete);
routes.get('/appointment/search', AppointmentController.search);

routes.get('/patient', PatientController.index);
routes.post('/patient/add', PatientController.store);
routes.patch('/patient/update', PatientController.update);
routes.delete('/patient/delete', PatientController.delete);
routes.get('/patient/search', PatientController.search);

routes.get('/nurse', NurseController.index);
routes.post('/nurse/add', NurseController.store);
routes.patch('/nurse/update', NurseController.update);
routes.delete('/nurse/delete', NurseController.delete);
routes.get('/nurse/search', NurseController.search);

routes.get('/doctor', DoctorController.index);
routes.post('/doctor/add', DoctorController.store);
routes.patch('/doctor/update', DoctorController.update);
routes.delete('/doctor/delete', DoctorController.delete);
routes.get('/doctor/search', DoctorController.search);

routes.get('/shift', ShiftController.index);
routes.post('/shift/add', ShiftController.store);
routes.patch('/shift/update', ShiftController.update);
routes.delete('/shift/delete', ShiftController.delete);

export default routes;

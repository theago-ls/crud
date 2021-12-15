import express from 'express';
import {
  AppointmentController,
  PatientController,
  DoctorController,
  NurseController,
  ShiftController,
} from './controllers';

import { validate, nurse, doctor, patient, shift } from './validators';

const routes = express.Router();

routes.get('/appointment', AppointmentController.index);
routes.post('/appointment/add', validate(nurse.add), AppointmentController.store);
routes.patch('/appointment/update', validate(nurse.upd), AppointmentController.update);
routes.delete('/appointment/delete', validate(nurse.del), AppointmentController.delete);
routes.get('/appointment/search', validate(nurse.search), AppointmentController.search);

routes.get('/patient', PatientController.index);
routes.post('/patient/add', validate(patient.add), PatientController.store);
routes.patch('/patient/update', validate(patient.upd), PatientController.update);
routes.delete('/patient/delete', validate(patient.del), PatientController.delete);
routes.get('/patient/search', validate(patient.search), PatientController.search);

routes.get('/nurse', NurseController.index);
routes.post('/nurse/add', validate(nurse.search), NurseController.store);
routes.patch('/nurse/update', validate(nurse.upd), NurseController.update);
routes.delete('/nurse/delete', validate(nurse.del), NurseController.delete);
routes.get('/nurse/search', validate(nurse.search), NurseController.search);

routes.get('/doctor', DoctorController.index);
routes.post('/doctor/add', validate(doctor.add), DoctorController.store);
routes.patch('/doctor/update', validate(doctor.upd), DoctorController.update);
routes.delete('/doctor/delete', validate(doctor.del), DoctorController.delete);
routes.get('/doctor/search', validate(doctor.search), DoctorController.search);

routes.get('/shift', ShiftController.index);
routes.post('/shift/add', validate(shift.add), ShiftController.store);
routes.patch('/shift/update', validate(shift.upd), ShiftController.update);
routes.delete('/shift/delete', validate(shift.del), ShiftController.delete);

export default routes;

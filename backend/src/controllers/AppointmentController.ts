import db from '../database';
import { Request, Response } from 'express';

export default {
  async index(req: Request, res: Response) {
    try {
      const appointmentList = await db.appointment.findMany();
      return res.json(appointmentList);
    } catch (err) {
      return res.status(500).json({ message: 'Error processing your request. Please, try again later!' });
    }
  },

  async store(req: Request, res: Response) {
    const { doctor, patient } = req.body;
    const newAppointment = req.body;

    try {
      const appointmentExists = await db.appointment.findFirst({
        where: {
          doctorCPF: doctor,
          patientCPF: patient,
        },
      });

      if (appointmentExists) {
        return res.json(appointmentExists);
      }
    } catch (err) {
      return res.status(500).json({ message: 'Error processing your request. Please, try again later!' });
    }

    try {
      const doctorExists = await db.doctor.findUnique({
        where: {
          CPF: doctor,
        },
      });

      const patientExists = await db.patient.findUnique({
        where: {
          CPF: patient,
        },
      });

      if (!doctorExists || !patientExists) {
        return res.status(404).json({ message: 'Doctor or patient not found!' });
      }

      const newConsulta = await db.appointment.create({
        data: {
          ...newAppointment,
          date: new Date(newAppointment.date),
          doctor: {
            connect: {
              CPF: newAppointment.doctor,
            },
          },
          patient: {
            connect: {
              CPF: newAppointment.patient,
            },
          },
        },
      });

      if (newConsulta) return res.json(newConsulta);
      else return res.status(500).json({ message: 'Appointment saving failed' });
    } catch (err) {
      return res.status(500).json({ message: 'Error processing your request. Please, try again later!' });
    }
  },

  async update(req: Request, res: Response) {
    const { id, date, type } = req.body;

    try {
      const appointmentExists = await db.appointment.update({
        where: {
          id,
        },
        data: {
          type,
          date: new Date(date),
        },
      });

      if (appointmentExists) return res.json(appointmentExists);
      else return res.status(404).json({ message: 'Appointment was not found!' });
    } catch (err) {
      return res.status(500).json({ message: 'Error processing your request. Please, try again later!' });
    }
  },

  async delete(req: Request, res: Response) {
    const { id } = req.query;

    try {
      const deletedAppointment = await db.appointment.delete({
        where: {
          id: parseInt(id as string, 10),
        },
      });

      if (deletedAppointment) return res.json(deletedAppointment);
      else return res.status(404).json({ message: 'Appointment was not found!' });
    } catch (err) {
      return res.status(500).json({ message: 'Error processing your request. Please, try again later!' });
    }
  },

  async search(req: Request, res: Response) {
    const { doctor, patient } = req.query;

    try {
      const appointmentExists = await db.appointment.findFirst({
        where: {
          doctorCPF: doctor as string,
          patientCPF: patient as string,
        },
      });

      if (appointmentExists) return res.json(appointmentExists);
      else return res.status(404).json({ message: 'Appointment was not found!' });
    } catch (err) {
      return res.status(500).json({ message: 'Error processing your request. Please, try again later!' });
    }
  },
};

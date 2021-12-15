import { Request, Response } from 'express';
import db from '../database';

module.exports = {
  async index(req: Request, res: Response) {
    try {
      const patientList = await db.patient.findMany();
      return res.json(patientList);
    } catch (err) {
      return res.status(500).json({ message: 'Error processing your request. Please, try again later!' });
    }
  },

  async store(req: Request, res: Response) {
    const { CPF } = req.body;
    const newPatient = req.body;

    try {
      const patientExists = await db.patient.findUnique({
        where: { CPF },
      });

      if (patientExists) {
        return res.json(patientExists);
      }
    } catch (err) {
      return res.status(500).json({ message: 'Error processing your request. Please, try again later!' });
    }

    try {
      const createdPatient = await db.patient.create({
        data: {
          ...newPatient,
          address: {
            create: {
              ...newPatient.address,
              CPF: newPatient.CPF,
            },
          },
          dob: new Date(newPatient.dob),
        },
      });

      if (createdPatient) return res.json(createdPatient);
      else return res.status(500).json({ message: 'Patient saving failed!' });
    } catch (err) {
      return res.status(500).json({ message: 'Error processing your request. Please, try again later!' });
    }
  },

  async update(req: Request, res: Response) {
    const { CPF } = req.body;
    const newPatient = req.body;

    try {
      const patientExists = await db.patient.update({
        where: { CPF },
        data: newPatient,
      });

      if (patientExists) return res.json(patientExists);
      else return res.status(404).json({ message: 'Patient was not found!' });
    } catch (err) {
      return res.status(500).json({ message: 'Error processing your request. Please, try again later!' });
    }
  },

  async delete(req: Request, res: Response) {
    const { CPF } = req.body;

    try {
      const deletePatient = db.patient.delete({ where: { CPF } });
      const deleteAddress = db.address.delete({ where: { CPF } });

      await db.$transaction([deletePatient, deleteAddress]);

      return res.json({ message: 'Patient was deleted successfully!' });
    } catch (err) {
      return res.status(404).json({ message: 'Patient was not found!' });
    }
  },

  async search(req: Request, res: Response) {
    const { CPF } = req.query;

    try {
      const patientExists = await db.patient.findUnique({
        where: { CPF: CPF as string },
      });

      if (patientExists) return res.json(patientExists);
      else return res.status(404).json({ message: 'Patient was not found!' });
    } catch (err) {
      return res.status(500).json({ message: 'Error processing your request. Please, try again later!' });
    }
  },
};

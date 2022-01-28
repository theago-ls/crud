import { Request, Response } from 'express';
import db from '../database';

export default {
  async index(req: Request, res: Response) {
    try {
      const doctorList = await db.doctor.findMany();
      return res.json(doctorList);
    } catch (err) {
      console.log('Error: ', err);
      return res.status(500).json({ message: 'Error processing your request. Please, try again later!' });
    }
  },

  async store(req: Request, res: Response) {
    const { CPF } = req.body;
    const newDoctor = req.body;

    try {
      const doctorExists = await db.doctor.findUnique({
        where: { CPF },
      });

      if (doctorExists) {
        return res.json(doctorExists);
      }
    } catch (err) {
      console.log('Error: ', err);
      return res.status(500).json({ message: 'Error processing your request. Please, try again later!' });
    }

    try {
      const newMedico = await db.doctor.create({
        data: {
          ...newDoctor,
          address: {
            create: {
              ...newDoctor.address,
              CPF: newDoctor.CPF,
            },
          },
          dob: new Date(newDoctor.dob),
          admissionDate: new Date(newDoctor.admissionDate),
        },
      });

      if (newMedico) return res.json(newMedico);
      else return res.status(500).json({ message: 'Doctor saving failed!' });
    } catch (err) {
      console.log('Error: ', err);
      return res.status(500).json({ message: 'Error processing your request. Please, try again later!' });
    }
  },

  async update(req: Request, res: Response) {
    const { CPF } = req.body;
    const newDoctor = req.body;

    try {
      const doctorExists = await db.doctor.update({
        where: { CPF },
        data: newDoctor,
      });

      if (doctorExists) return res.json(doctorExists);
      else return res.json({ message: 'Doctor was not found!' });
    } catch (err) {
      console.log('Error: ', err);
      return res.status(500).json({ message: 'Error processing your request. Please, try again later!' });
    }
  },

  async delete(req: Request, res: Response) {
    const { CPF } = req.body;

    try {
      const deleteDoctor = db.doctor.delete({ where: { CPF } });
      const deleteAddress = db.address.delete({ where: { CPF } });

      await db.$transaction([deleteDoctor, deleteAddress]);

      return res.json({ message: 'Doctor was deleted successfully!' });
    } catch (err) {
      console.log('Error: ', err);
      return res.status(404).json({ message: 'Doctor was not found!' });
    }
  },

  async search(req: Request, res: Response) {
    const { CPF } = req.query;

    try {
      const doctorExists = await db.doctor.findUnique({
        where: { CPF: CPF as string },
      });

      if (doctorExists) {
        return res.json(doctorExists);
      } else return res.status(404).json({ message: 'Doctor was not found!' });
    } catch (err) {
      console.log('Error: ', err);
      return res.status(500).json({ message: 'Error processing your request. Please, try again later!' });
    }
  },
};

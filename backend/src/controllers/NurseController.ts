import { Request, Response } from 'express';
import db from '../database';

export default {
  async index(req: Request, res: Response) {
    try {
      const nurseList = await db.nurse.findMany();
      return res.json(nurseList);
    } catch (err) {
      return res.status(500).json({ message: 'Error processing your request. Please, try again later!' });
    }
  },

  async store(req: Request, res: Response) {
    const { CPF } = req.body;
    const newNurse = req.body;

    try {
      const nurseExists = await db.nurse.findUnique({
        where: { CPF },
      });

      if (nurseExists) {
        return res.json(nurseExists);
      }
    } catch (err) {
      return res.status(500).json({ message: 'Error processing your request. Please, try again later!' });
    }

    try {
      const createdNurse = await db.nurse.create({
        data: {
          ...newNurse,
          address: {
            create: {
              ...newNurse.address,
              CPF: newNurse.CPF,
            },
          },
          dob: new Date(newNurse.dob),
          admissionDate: new Date(newNurse.admissionDate),
        },
      });

      if (createdNurse) return res.json(createdNurse);
      else return res.status(500).json({ message: 'Nurse saving failed!' });
    } catch (err) {
      return res.status(500).json({ message: 'Error processing your request. Please, try again later!' });
    }
  },

  async update(req: Request, res: Response) {
    const { CPF } = req.body;
    const newNurse = req.body;

    try {
      const nurseExists = await db.nurse.update({
        where: { CPF },
        data: newNurse,
      });

      if (nurseExists) return res.json(nurseExists);
      else return res.status(404).json({ message: 'Nurse was not found!' });
    } catch (err) {
      return res.status(500).json({ message: 'Error processing your request. Please, try again later!' });
    }
  },

  async delete(req: Request, res: Response) {
    const { CPF } = req.body;

    try {
      const deleteNurse = db.nurse.delete({ where: { CPF } });
      const deleteAddress = db.address.delete({ where: { CPF } });

      await db.$transaction([deleteNurse, deleteAddress]);

      return res.json({ message: 'Nurse was deleted successfully!' });
    } catch (err) {
      return res.status(404).json({ message: 'Nurse was not found!' });
    }
  },

  async search(req: Request, res: Response) {
    const { CPF } = req.query;

    try {
      const nurseExists = await db.nurse.findUnique({
        where: { CPF: CPF as string },
      });

      if (nurseExists) return res.json(nurseExists);
      else return res.status(404).json({ message: 'Nurse was not found!' });
    } catch (err) {
      return res.status(500).json({ message: 'Error processing your request. Please, try again later!' });
    }
  },
};

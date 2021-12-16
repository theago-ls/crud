import { Request, Response } from 'express';
import db from '../database';

export default {
  async index(req: Request, res: Response) {
    try {
      const shiftList = await db.shift.findMany();
      return res.json(shiftList);
    } catch (err) {
      return res.status(500).json({ message: 'Error processing your request. Please, try again later!' });
    }
  },

  async store(req: Request, res: Response) {
    const { CPF } = req.body;
    const newShift = req.body;

    try {
      const shiftExists = await db.shift.findUnique({
        where: { CPF },
      });

      if (shiftExists) {
        return res.json(shiftExists);
      }
    } catch (err) {
      return res.status(500).json({ message: 'Error processing your request. Please, try again later!' });
    }

    try {
      const doctorExists = await db.doctor.findUnique({
        where: { CPF },
      });

      const nurseExists = await db.nurse.findUnique({
        where: { CPF },
      });

      if (!nurseExists && !doctorExists) {
        return res.status(404).json({ message: 'It was not found an employee with the specified identifier!' });
      }

      const createdShift = await db.shift.create({ data: newShift });

      if (createdShift) return res.json(createdShift);
      else return res.status(500).json({ message: 'Shift saving failed!' });
    } catch (err) {
      return res.status(500).json({ message: 'Error processing your request. Please, try again later!' });
    }
  },

  async update(req: Request, res: Response) {
    const { CPF } = req.body;
    const newShift = req.body;

    try {
      const shiftExists = await db.shift.update({
        where: { CPF },
        data: newShift,
      });

      if (shiftExists) return res.json(shiftExists);
      else return res.status(404).json({ message: 'Shift was not found!' });
    } catch (err) {
      return res.status(500).json({ message: 'Error processing your request. Please, try again later!' });
    }
  },

  async delete(req: Request, res: Response) {
    const { CPF } = req.body;

    try {
      const deletedTurno = await db.shift.delete({ where: { CPF } });

      if (deletedTurno) return res.json(deletedTurno);
      else return res.status(404).json({ message: 'Shift was not found!' });
    } catch (err) {
      return res.status(500).json({ message: 'Error processing your request. Please, try again later!' });
    }
  },
};

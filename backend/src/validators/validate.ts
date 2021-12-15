import { NextFunction, Request, Response } from 'express';
import { SchemaOf } from 'yup';

const validate = (schema: SchemaOf<any>) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    await schema.validate({
      body: req.body,
      query: req.query,
      params: req.params,
    });
    return next();
  } catch (err: any) {
    return res.status(500).json({ type: err.name, message: err.message });
  }
};

export default validate;

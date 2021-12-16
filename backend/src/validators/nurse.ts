import * as yup from 'yup';
import addressSchema from './address';

const add = yup.object({
  body: yup.object({
    CPF: yup
      .string()
      .test('len', 'CPF must be exactly 11 characters', (val: string | undefined) => val?.length === 11)
      .required(),
    name: yup.string().max(50).required(),
    gender: yup.string().min(4).max(6).required(),
    phone: yup.string().max(11).required(),
    dob: yup.date().required(),
    admissionDate: yup.date().required(),
    expertise: yup.string().required(),
    address: addressSchema,
  }),
});

const upd = yup.object({
  body: yup.object({
    CPF: yup
      .string()
      .test('len', 'CPF must be exactly 11 characters', (val: string | undefined) => val?.length === 11)
      .required(),
    name: yup.string().max(50),
    gender: yup.string().min(4).max(6),
    phone: yup.string().max(11),
    dob: yup.date(),
    admissionDate: yup.date(),
    expertise: yup.string(),
  }),
});

const del = yup.object({
  body: yup.object({
    CPF: yup
      .string()
      .test('len', 'CPF must be exactly 11 characters', (val: string | undefined) => val?.length === 11)
      .required(),
  }),
});

const search = yup.object({
  query: yup.object({
    CPF: yup
      .string()
      .test('len', 'CPF must be exactly 11 characters', (val: string | undefined) => val?.length === 11)
      .required(),
  }),
});

export default { add, upd, del, search };

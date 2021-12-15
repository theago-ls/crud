import yup from 'yup';
import addressSchema from './address';

const add = yup.object({
  body: yup.object({
    CRM: yup.string().required(),
    CPF: yup.string().required(),
    name: yup.string().min(8).max(32).required(),
    gender: yup.string().min(8).max(255).required(),
    phone: yup.string().email().required(),
    dob: yup.date().required(),
    admissionDate: yup.date().required(),
    expertise: yup.string().required(),
    address: addressSchema,
  }),
});

const upd = yup.object({
  body: yup.object({
    CRM: yup.string(),
    CPF: yup.string().required(),
    name: yup.string().min(8).max(32),
    gender: yup.string().min(8).max(255),
    phone: yup.string().email(),
    dob: yup.date(),
    admissionDate: yup.date(),
    expertise: yup.string(),
  }),
});

const del = yup.object({
  body: yup.object({
    CPF: yup.string().required(),
  }),
});

const search = yup.object({
  body: yup.object({
    CPF: yup.string().required(),
  }),
});

export default { add, upd, del, search };

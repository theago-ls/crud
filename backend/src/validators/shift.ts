import * as yup from 'yup';

const add = yup.object({
  body: yup.object({
    CPF: yup
      .string()
      .test('len', 'CPF must be exactly 11 characters', (val: string | undefined) => val?.length === 11)
      .required(),
    checkIn: yup.string().required(),
    checkOut: yup.string().required(),
  }),
});

const upd = yup.object({
  body: yup.object({
    CPF: yup
      .string()
      .test('len', 'CPF must be exactly 11 characters', (val: string | undefined) => val?.length === 11)
      .required(),
    checkIn: yup.string(),
    checkOut: yup.string(),
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

export default { add, upd, del };

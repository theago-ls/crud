import yup from 'yup';

const add = yup.object({
  body: yup.object({
    CPF: yup.string().required(),
    checkIn: yup.string().required(),
    checkOut: yup.string().required(),
  }),
});

const upd = yup.object({
  body: yup.object({
    CPF: yup.string().required(),
    checkIn: yup.string(),
    checkOut: yup.string(),
  }),
});

const del = yup.object({
  body: yup.object({
    CPF: yup.string().required(),
  }),
});

export default { add, upd, del };

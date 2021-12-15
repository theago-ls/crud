import yup from 'yup';

const address = yup.object({
  body: yup.object({
    CPF: yup.string().required(),
    street: yup.string().required(),
    street2: yup.string(),
    number: yup.number().required(),
    zipcode: yup.string().required(),
    neighborhood: yup.string().required(),
    city: yup.string().required(),
    state: yup.string().required(),
  }),
});

export default address;

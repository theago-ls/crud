import * as yup from 'yup';

const address = yup.object({
  street: yup.string().required(),
  street2: yup.string(),
  number: yup.number().required(),
  zipcode: yup.string().required(),
  neighborhood: yup.string().required(),
  city: yup.string().required(),
  state: yup.string().required(),
});

export default address;

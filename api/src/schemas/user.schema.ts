import * as yup from 'yup';

export const userSchema = yup.object().shape({
  username: yup
    .string()
    .required()
    .min(3, 'username must contain at least three characters'),

  password: yup
    .string()
    .min(8, 'password must contain at least eight characters')
    .required()
    .matches(/[0-9]/, 'password must contain at least one number')
    .matches(/[A-Z]/, 'password must contain at least one uppercase letter'),
});

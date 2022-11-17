import * as yup from 'yup';

export const userSchema = yup.object().shape({
    username: yup.string()
    .required()
    .min(3, "Username must contain at least three characters"),
    
    password: yup.string()
    .min(8, "Password must contain at least eight characters")
    .required()
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    });

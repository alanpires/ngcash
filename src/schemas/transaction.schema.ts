import * as yup from 'yup';

export const createTransactionSchema = yup.object().shape({
    usernameCashIn: yup.string()
    .required(),
    
    value: yup.number()
    .required()
});

export const filterTransactionSchema = yup.object().shape({
    start_date: yup.string()
    .required(),
    
    end_date: yup.string()
    .required(),

    cashIn: yup.boolean()
    .notRequired(),

    cashOut: yup.boolean()
    .notRequired()
});
import * as yup from 'yup';
import {
  AuthorizeDirectChargeOptions,
  DirectChargeOptions,
} from '../interfaces';

export const validateDirectChargeOptions = async (
  options: DirectChargeOptions
) => {
  const schema = yup.object().shape({
    first_name: yup
      .string()
      .nullable()
      .optional(),
    last_name: yup
      .string()
      .nullable()
      .optional(),
    email: yup
      .string()
      .email()
      .nullable()
      .optional(),
    mobile: yup
      .string()
      .matches(
        /^0[79]\d{8}$/,
        'Phone number must be 10 digits and start with 09 or 07'
      )
      .required(),
    currency: yup.string().required(),
    amount: yup.string().required(),
    tx_ref: yup.string().required(),
    type: yup.string().required(),
  });

  return await schema.validate(options);
};

export const validateAuthorizeDirectChargeOptions = async (
  options: AuthorizeDirectChargeOptions
) => {
  const schema = yup.object().shape({
    reference: yup.string().required(),
    client: yup.string().required(),
    type: yup.string().required(),
  });

  return await schema.validate(options);
};

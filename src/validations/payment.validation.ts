import * as yup from 'yup';
import { InitializeOptions, VerifyOptions } from '../interfaces';

export const validateInitializeOptions = async (options: InitializeOptions) => {
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
    phone_number: yup
      .string()
      .matches(
        /^0[79]\d{8}$/,
        'Phone number must be 10 digits and start with 09 or 07'
      )
      .nullable()
      .optional(),
    currency: yup.string().required(),
    amount: yup.string().required(),
    tx_ref: yup.string().required(),
    callback_url: yup
      .string()
      .nullable()
      .optional(),
    return_url: yup
      .string()
      .nullable()
      .optional(),
    customization: yup
      .object()
      .shape({
        title: yup
          .string()
          .nullable()
          .optional(),
        description: yup
          .string()
          .nullable()
          .optional(),
        logo: yup
          .string()
          .nullable()
          .optional(),
      })
      .optional(),
    subaccounts: yup
      .array()
      .of(
        yup.object().shape({
          id: yup.string().required(),
          split_type: yup
            .string()
            .nullable()
            .optional(),
          split_value: yup
            .string()
            .nullable()
            .optional(),
        })
      )
      .nullable()
      .optional(),
  });

  return await schema.validate(options);
};

export const validateVerifyOptions = async (options: VerifyOptions) => {
  const schema = yup.object().shape({
    tx_ref: yup.string().required(),
  });

  return await schema.validate(options);
};

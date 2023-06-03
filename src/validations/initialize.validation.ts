import * as yup from 'yup';
import { InitializeOptions } from '../interfaces/initialize.interface';

export const validateInitializeOptions = async (
  initializeOptions: InitializeOptions
) => {
  const schema = yup.object().shape({
    first_name: yup.string().required(),
    last_name: yup.string().required(),
    email: yup.string().email(),
    currency: yup.string().required(),
    amount: yup.string().required(),
    tx_ref: yup.string().required(),
    callback_url: yup
      .string()
      .url()
      .optional(),
    return_url: yup
      .string()
      .url()
      .optional(),
    customization: yup
      .object()
      .shape({
        title: yup.string().optional(),
        description: yup.string().optional(),
        logo: yup.string().optional(),
      })
      .optional(),
    subaccounts: yup
      .array()
      .of(
        yup.object().shape({
          id: yup.string().required(),
          split_type: yup.string().optional(),
          transaction_charge: yup.string().optional(),
        })
      )
      .nullable()
      .optional(),
  });

  return await schema.validate(initializeOptions);
};

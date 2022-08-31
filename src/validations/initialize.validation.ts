import * as yup from 'yup';
import { InitializeOptions } from '../interfaces/initialize.interface';

export const validateInitializeOptions = async (
  initializeOptions: InitializeOptions,
) => {
  const schema = yup.object().shape({
    first_name: yup.string().required(),
    last_name: yup.string().required(),
    email: yup.string().email(),
    currency: yup.string().required(),
    amount: yup.string().required(),
    tx_ref: yup.string().required(),
    callback_url: yup.string().url().optional(),
    'customization[title]': yup.string().optional(),
    'customization[description]': yup.string().optional(),
  });

  return await schema.validate(initializeOptions);
};

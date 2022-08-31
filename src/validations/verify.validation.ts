import * as yup from 'yup';
import { VerifyOptions } from '../interfaces/verify.interface';

export const validateVerifyOptions = async (verifyOptions: VerifyOptions) => {
  const schema = yup.object().shape({
    tx_ref: yup.string().required(),
  });

  return await schema.validate(verifyOptions);
};

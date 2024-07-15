import * as yup from 'yup';
import { GenTxRefOptions } from '../interfaces';

export const validateGenTxRefOptions = async (
  genTxRefOptions: GenTxRefOptions
) => {
  const schema = yup.object().shape({
    removePrefix: yup.boolean().optional(),
    prefix: yup.string().optional(),
    size: yup.number().optional(),
  });

  return await schema.validate(genTxRefOptions);
};

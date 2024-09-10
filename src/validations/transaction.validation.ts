import * as yup from 'yup';
import { GetTransactionLogsOptions } from '../interfaces';

export const validateGetTransactionLogsOptions = async (
  options: GetTransactionLogsOptions
) => {
  const schema = yup.object().shape({
    ref_id: yup.string().required(),
  });

  return await schema.validate(options);
};

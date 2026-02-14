import { z } from 'zod';
import { GetTransactionLogsOptions } from '../interfaces';

const transactionLogsSchema = z.object({
  ref_id: z.string(),
});

export const validateGetTransactionLogsOptions = (
  options: GetTransactionLogsOptions
) => {
  return transactionLogsSchema.parse(options);
};

import { z } from 'zod';
import { RefundOptions } from '../interfaces';

const refundSchema = z.object({
  tx_ref: z.string(),
  reason: z.string().optional(),
  amount: z.string().optional(),
  meta: z
    .object({
      customer_id: z.string().optional(),
      reference: z.string().optional(),
    })
    .optional(),
});

export const validateRefundOptions = (options: RefundOptions) => {
  return refundSchema.parse(options);
};

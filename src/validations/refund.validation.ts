import * as yup from 'yup';
import { RefundOptions } from '../interfaces';

export const validateRefundOptions = async (options: RefundOptions) => {
  const schema = yup.object().shape({
    tx_ref: yup.string().required(),
    reason: yup.string().optional(),
    amount: yup.string().optional(),
    meta: yup
      .object()
      .shape({
        customer_id: yup.string().optional(),
        reference: yup.string().optional(),
      })
      .optional(),
  });

  return await schema.validate(options);
};

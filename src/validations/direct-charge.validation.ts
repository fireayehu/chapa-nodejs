import { z } from 'zod';
import {
  AuthorizeDirectChargeOptions,
  DirectChargeOptions,
} from '../interfaces';

const directChargeSchema = z.object({
  first_name: z.string().optional(),
  last_name: z.string().optional(),
  email: z.string().email().optional(),
  mobile: z
    .string()
    .regex(
      /^0[79]\d{8}$/,
      'Phone number must be 10 digits and start with 09 or 07'
    ),
  currency: z.string(),
  amount: z.string(),
  tx_ref: z.string(),
  type: z.string(),
});

const authorizeDirectChargeSchema = z.object({
  reference: z.string(),
  client: z.string(),
  type: z.string(),
});

export const validateDirectChargeOptions = (options: DirectChargeOptions) => {
  return directChargeSchema.parse(options);
};

export const validateAuthorizeDirectChargeOptions = (
  options: AuthorizeDirectChargeOptions
) => {
  return authorizeDirectChargeSchema.parse(options);
};

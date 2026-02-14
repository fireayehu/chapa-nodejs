import { z } from 'zod';
import { SplitType } from '../enums';
import { InitializeOptions, VerifyOptions } from '../interfaces';

const initializeSchema = z.object({
  first_name: z.string().optional(),
  last_name: z.string().optional(),
  email: z.string().email().optional(),
  phone_number: z
    .string()
    .regex(
      /^0[79]\d{8}$/,
      'Phone number must be 10 digits and start with 09 or 07'
    )
    .optional(),
  currency: z.string(),
  amount: z.string(),
  tx_ref: z.string(),
  callback_url: z.string().optional(),
  return_url: z.string().optional(),
  customization: z
    .object({
      title: z.string().optional(),
      description: z.string().optional(),
      logo: z.string().optional(),
    })
    .optional(),
  subaccounts: z
    .array(
      z.object({
        id: z.string(),
        split_type: z.nativeEnum(SplitType).optional(),
        split_value: z.coerce.number().optional(),
      })
    )
    .optional(),
});

const verifySchema = z.object({
  tx_ref: z.string(),
});

export const validateInitializeOptions = (options: InitializeOptions) => {
  return initializeSchema.parse(options);
};

export const validateVerifyOptions = (options: VerifyOptions) => {
  return verifySchema.parse(options);
};

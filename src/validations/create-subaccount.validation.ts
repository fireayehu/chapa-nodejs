import { z } from 'zod';
import { SplitType } from '../enums';
import { CreateSubaccountOptions } from '../interfaces';

const createSubaccountSchema = z.object({
  business_name: z.string(),
  account_name: z.string(),
  bank_code: z.number(),
  account_number: z.string(),
  split_type: z.nativeEnum(SplitType),
  split_value: z.number(),
});

export const validateCreateSubaccountOptions = (
  createSubaccountOptions: CreateSubaccountOptions
) => {
  return createSubaccountSchema.parse(createSubaccountOptions);
};

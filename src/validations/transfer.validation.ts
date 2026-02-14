import { z } from 'zod';
import {
  BulkTransferOptions,
  TransferOptions,
  VerifyTransferOptions,
} from '../interfaces';

const transferSchema = z.object({
  account_name: z.string(),
  account_number: z.string(),
  amount: z.string(),
  currency: z.string(),
  reference: z.string(),
  bank_code: z.number(),
});

const bulkTransferSchema = z.object({
  title: z.string(),
  currency: z.string(),
  bulk_data: z.array(
    z.object({
      account_name: z.string(),
      account_number: z.string(),
      amount: z.string(),
      reference: z.string(),
      bank_code: z.number(),
    })
  ),
});

const verifyTransferSchema = z.object({
  tx_ref: z.string(),
});

export const validateTransferOptions = (options: TransferOptions) => {
  return transferSchema.parse(options);
};

export const validateBulkTransferOptions = (options: BulkTransferOptions) => {
  return bulkTransferSchema.parse(options);
};

export const validateVerifyTransferOptions = (
  options: VerifyTransferOptions
) => {
  return verifyTransferSchema.parse(options);
};

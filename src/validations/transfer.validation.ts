import * as yup from 'yup';
import {
  BulkTransferOptions,
  TransferOptions,
  VerifyTransferOptions,
} from '../interfaces';

export const validateTransferOptions = async (options: TransferOptions) => {
  const schema = yup.object().shape({
    account_name: yup.string().required(),
    account_number: yup.string().required(),
    amount: yup.string().required(),
    currency: yup.string().required(),
    reference: yup.string().required(),
    bank_code: yup.number().required(),
  });

  return await schema.validate(options);
};

export const validateBulkTransferOptions = async (
  options: BulkTransferOptions
) => {
  const schema = yup.object().shape({
    title: yup.string().required(),
    currency: yup.string().required(),
    bulk_data: yup
      .array()
      .of(
        yup.object().shape({
          account_name: yup.string().required(),
          account_number: yup.string().required(),
          amount: yup.string().required(),
          reference: yup.string().required(),
          bank_code: yup.number().required(),
        })
      )
      .required(),
  });

  return await schema.validate(options);
};

export const validateVerifyTransferOptions = async (
  options: VerifyTransferOptions
) => {
  const schema = yup.object().shape({
    tx_ref: yup.string().required(),
  });

  return await schema.validate(options);
};

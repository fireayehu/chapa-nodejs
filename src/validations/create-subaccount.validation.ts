import * as yup from 'yup';
import { SplitType } from '../enums';
import { CreateSubaccountOptions } from '../interfaces';

export const validateCreateSubaccountOptions = async (
  createSubaccountOptions: CreateSubaccountOptions,
) => {
  const schema = yup.object().shape({
    business_name: yup.string().required(),
    account_name: yup.string().required(),
    bank_code: yup.string().required(),
    account_number: yup.string().required(),
    split_type: yup.mixed().oneOf(Object.values(SplitType)).required(),
    split_value: yup.number().required(),
  });

  return await schema.validate(createSubaccountOptions);
};

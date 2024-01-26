// import { DirectChargePaymentMethod } from '../interaces/initialize.interface';

import { DirectChargePaymentMethod } from '../interfaces';

export enum ChapaUrls {
  INITIALIZE = 'https://api.chapa.co/v1/transaction/initialize',
  MOBILE_INITIALIZE = 'https://api.chapa.co/v1/transaction/mobile-initialize',
  VERIFY = 'https://api.chapa.co/v1/transaction/verify',
  BANKS = 'https://api.chapa.co/v1/banks',
  SUBACCOUNT = 'https://api.chapa.co/v1/subaccount',
}

export const INITIALIZE_DIRECT_CHARGE = ({ type }: DirectChargePaymentMethod) =>
  `https://api.chapa.co/v1/charges?type=${type}`;

export const AUTHERIZE_DIRECT_CHARGE = (
  payment_method: 'telebirr' | 'cbebirr' | 'awash_birr' | 'ebirr' | 'amole'
) => `https://api.chapa.co/v1/validate?type=${payment_method}`;

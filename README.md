<h1 align="center">
<div align="center">
  <a href="https://chapa.co/" target="_blank">
    <img src="./docs/logo.png" width="320" alt="Nest Logo"/>
  </a>
  <p align="center">NodeJS sdk for chapa</p>
</div>
</h1>

## Features

- Initialize Transaction
- Split Payment
- Verify Payment
- Get Banks
- Create Subaccount
- Generate Transaction Reference (Utiltiy Function)
- Full TypeScript Support

## Installation

**NPM**

```bash
$ npm i -s chapa-nodejs
```

**Yarn**

```bash
$ yarn add chapa-nodejs
```

## Getting started

Once the installation process is complete, we can import the sdk in any file.

&nbsp;

### Configuration

```typescript
import { Chapa } from 'chapa-nodejs';

const chapa = new Chapa({
  secretKey: 'your-chapa-secret-key',
});
```

&nbsp;

### Generate Transaction Reference

This utility method of `Chapa` instance allows you to generating a customizable random alpha numberic transaction reference.

```typescript
const tx_ref = await chapa.generateTransactionReference(); // result: TX-JHBUVLM7HYMSWDA

// Or with options

const tx_ref = await chapa.generateTransactionReference({
  prefix: 'TX', // defaults to `TX`
  size: 20, // defaults to `15`
});
```

### Initialize Transaction

To initialize a transaction, we have two possilbe ways. The first one is for web payment, simply call the `initialize` method from `Chapa` instance, and pass to it `InitializeOptions` options. For mobile payment use `mobileInitialize`, it accepts and returns the same format as the `initialize` method.

```typescript
// Generate transaction reference using our utility method or provide your own
const tx_ref = await chapa.generateTransactionReference();

const response = await chapa.initialize({
  first_name: 'John',
  last_name: 'Doe',
  email: 'john@gmail.com',
  currency: 'ETB',
  amount: '200',
  tx_ref: tx_ref,
  callback_url: 'https://example.com/',
  return_url: 'https://example.com/',
  customization: {
    title: 'Test Title',
    description: 'Test Description',
  },
});
```

```typescript
// Generate transaction reference using our utility method or provide your own
const tx_ref = await chapa.generateTransactionReference();

const response = await chapa.mobileInitialize({
  first_name: 'John',
  last_name: 'Doe',
  email: 'john@gmail.com',
  currency: 'ETB',
  amount: '200',
  tx_ref: tx_ref,
  callback_url: 'https://example.com/',
  return_url: 'https://example.com/',
  customization: {
    title: 'Test Title',
    description: 'Test Description',
  },
});
```

#### InitializeOptions

```typescript
enum SplitType {
  PERCENTAGE = 'percentage',
  FLAT = 'flat',
}

interface Subaccount {
  id: string;
  split_type?: SplitType;
  transaction_charge?: number;
}

interface InitializeOptions {
  first_name: string;
  last_name: string;
  email: string;
  currency: string;
  amount: string;
  tx_ref: string;
  callback_url?: string;
  return_url?: string;
  customization?: {
    title?: string;
    description?: string;
    logo?: string;
  };
  subaccounts?: Subaccount[];
}
```

#### InitializeResponse

```typescript
interface InitializeResponse {
  message: string;
  status: string;
  data: {
    checkout_url: string;
  };
}
```

### Verify Payment

To verify payment, simply call the `verify` method from `Chapa` instance, and pass to it `VerifyOptions` options.

```typescript
const response = await chapa.verify({
  tx_ref: 'TX-JHBUVLM7HYMSWDA',
});
```

#### VerifyOptions

```typescript
interface VerifyOptions {
  tx_ref: string;
}
```

#### VerifyResponse

```typescript
interface VerifyResponse {
  message: string;
  status: string;
  data: {
    first_name: string;
    last_name: string;
    email: string;
    currency: string;
    amount: string;
    charge: string;
    mode: string;
    method: string;
    type: string;
    status: string;
    reference: string;
    tx_ref: string;
    customization: {
      title: string;
      description: string;
      logo: string;
    };
    meta: any;
    created_at: Date;
    updated_at: Date;
  };
}
```

### Get Banks

This section describes how to get bank details for all supported banks `Chapa` is working with. `getBanks` method of `Chapa` instance returns all the Banks information for all currencies. The method does not accept any options.

```typescript
const response = await chapa.getBanks();
```

#### GetBanksResponse

```typescript
type Currency = 'ETB' | 'USD';

interface Data {
  id: string;
  swift: string;
  name: string;
  acct_length: number;
  country_id: number;
  created_at: Date;
  updated_at: Date;
  is_rtgs: boolean | null;
  is_mobilemoney: boolean | null;
  currency: Currency;
}

interface GetBanksResponse {
  message: string;
  data: Data[];
}
```

### Create Subaccount

To create subaccounts, simply call the `createSubaccount` method from `Chapa` instance, and pass to it `CreateSubaccountOptions` options.

```typescript
const response = await chapa.createSubaccount({
  business_name: 'Test Business',
  account_name: 'John Doe',
  bank_code: '80a510ea-7497-4499-8b49-ac13a3ab7d07', // Get this from the `getBanks()` method
  account_number: '0123456789',
  split_type: SplitType.PERCENTAGE,
  split_value: 0.02,
});
```

#### CreateSubaccountOptions

```typescript
interface CreateSubaccountOptions {
  business_name: string;
  account_name: string;
  bank_code: string;
  account_number: string;
  split_type: SplitType;
  split_value: number;
}
```

#### CreateSubaccountResponse

```typescript
interface CreateSubaccountResponse {
  message: string;
  status: string;
  data: string;
}
```

### Split Payment

Split payments are carried out by first creating a subaccount, then initializing the split payment. The process of implementing split payment is the same as initialize a transaction, with additional options( i.e `subaccounts`) to the `initialize` method of `Chapa`.

```typescript
// Generate transaction reference using our utility method or provide your own
const tx_ref = await chapa.generateTransactionReference();

const response = chapa.initialize({
  first_name: 'John',
  last_name: 'Doe',
  email: 'john@gmail.com',
  currency: 'ETB',
  amount: '200',
  tx_ref: tx_ref,
  callback_url: 'https://example.com/',
  return_url: 'https://example.com/',
  customization: {
    title: 'Test Title',
    description: 'Test Description',
  },
  // Add this for split payment
  subaccounts: [
    {
      id: '80a510ea-7497-4499-8b49-ac13a3ab7d07',
    },
  ],
});
```

#### Overriding The Defaults

When collecting a payment, you can override the default `split_type` and `split_value` you set when creating the subaccount, by specifying these fields in the subaccounts item.

```typescript
  subaccounts: [
    {
      id: '80a510ea-7497-4499-8b49-ac13a3ab7d07',
      split_type: SplitType.FLAT,
      transaction_charge: 25
    },
  ],
```

## Stay in touch

- Author - Fireayehu Zekarias
- Github - [https://github.com/fireayehu](https://github.com/fireayehu)
- Twitter - [https://twitter.com/Fireayehu](https://twitter.com/Fireayehu)
- LinkedIn - [https://www.linkedin.com/in/fireayehu/](https://www.linkedin.com/in/fireayehu/)

## License

chapa-nodejs is [MIT licensed](LICENSE).

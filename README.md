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
- List Banks
- Create Subaccount
- All Transaction
- Transaction Logs
- Generate Transaction Reference (Utiltiy Function)
- Full TypeScript Support

## Installation

**NPM**

```bash
$ npm install chapa-nodejs
```

**Yarn**

```bash
$ yarn add chapa-nodejs
```

**Pnpm**

```bash
$ pnpm add chapa-nodejs
```

## Getting started

Once the installation process is complete, we can import the sdk in any file.

&nbsp;

### Configuration

Keep in mind to load your secret key from environment variable

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
const tx_ref = await chapa.genTxRef(); // result: TX-JHBUVLM7HYMSWDA

// Or with options

const tx_ref = await chapa.genTxRef({
  removePrefix: false, // defaults to `false`
  prefix: 'TX', // defaults to `TX`
  size: 20, // defaults to `15`
});
```

### Initialize Transaction

To initialize a transaction, we have two possilbe ways. The first one is for web payment, simply call the `initialize` method from `Chapa` instance, and pass to it `InitializeOptions` options. For mobile payment use `mobileInitialize`, it accepts and returns the same format as the `initialize` method.

```typescript
// Generate transaction reference using our utility method or provide your own
const tx_ref = await chapa.genTxRef();

const response = await chapa.initialize({
  first_name: 'John',
  last_name: 'Doe',
  email: 'john@gmail.com',
  phone_number: '0911121314',
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
const tx_ref = await chapa.genTxRef();

const response = await chapa.mobileInitialize({
  first_name: 'John',
  last_name: 'Doe',
  email: 'john@gmail.com',
  phone_number: '0911121314',
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
  split_value?: number;
}

interface InitializeOptions {
  first_name?: string;
  last_name?: string;
  email?: string;
  phone_number?: string;
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
    phone_number: string;
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

### List Banks

This section describes how to get bank details for all supported banks `Chapa` is working with. `getBanks` method of `Chapa` instance returns all the Banks information for all currencies. The method does not accept any options.

```typescript
const response = await chapa.getBanks();
```

#### GetBanksResponse

```typescript
type Currency = 'ETB' | 'USD';

interface Data {
  id: number;
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

### All Transaction

This section describes how to get all transactions. `getTransactions` method of `Chapa` instance returns all the Transaction information. The method does not accept any options.

```typescript
const response = await chapa.getTransactions();
```

#### GetTransactionsResponse

```typescript
interface Customer {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  mobile: string;
}

interface Transaction {
  status: string;
  ref_id: string;
  type: string;
  created_at: Date;
  currency: string;
  amount: string;
  charge: string;
  trans_id: string;
  payment_method: string;
  customer: Customer;
}

interface Pagination {
  per_page: number;
  current_page: number;
  first_page_url: string;
  next_page_url: string;
  prev_page_url: string;
}

interface GetTransactionsResponse {
  message: string;
  status: string;
  data: {
    transactions: Transaction[];
    pagination: Pagination;
  };
}
```

### Transaction Logs

This section describes how to get timeline for a transaction. A transaction timeline is a list of events that happened to a selected transaction. To get list of timeline, simply call the `getTransactionLogs` method from `Chapa` instance, and pass to it `GetTransactionLogsOptions` options.

```typescript
const response = await chapa.getTransactionLogs({
  ref_id: 'chewatatest-6669',
});
```

#### VerifyOptions

```typescript
interface GetTransactionLogsOptions {
  ref_id: string;
}
```

#### GetTransactionLogsResponse

```typescript
interface Log {
  item: number;
  message: string;
  type: string;
  created_at: string;
  updated_at: string;
}

interface GetTransactionLogsResponse {
  message: string;
  status: string;
  data: Log[];
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
  bank_code: number;
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
const tx_ref = await chapa.genTxRef();

const response = chapa.initialize({
  first_name: 'John',
  last_name: 'Doe',
  email: 'john@gmail.com',
  phone_number: '0911121314',
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
      split_value: 25
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

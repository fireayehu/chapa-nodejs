<h1 align="center">
<div align="center">
  <a href="http://nestjs.com/" target="_blank">
    <img src="https://chapa.co/asset/images/logo_svg.svg" width="320" alt="Nest Logo"/>
  </a>
  <p align="center">NodeJS sdk for chapa</p>
</div>
</h1>

## Features

- Initialize Transaction and Get payment link
- Verify Payments
- Typescript support

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

### Initialize Transaction

To initialize a transaction, simply call the `initialize` method from `Chapa` instance, and pass to it `InitializeOptions` options.

```typescript
await chapa.initialize({
  first_name: 'John',
  last_name: 'Doe',
  email: 'john@gmail.com',
  currency: 'ETB',
  amount: '200',
  tx_ref: '02f8a19d-99a5-4598-b90d-3fb5b7a485ab',
});
```

#### InitializeOptions

```typescript
interface InitializeOptions {
  first_name: string;
  last_name: string;
  email: string;
  currency: string;
  amount: string;
  tx_ref: string;
  callback_url?: string;
  'customization[title]'?: string;
  'customization[description]'?: string;
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
await chapa.verify({
  tx_ref: '02f8a19d-99a5-4598-b90d-3fb5b7a485ab',
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

## Stay in touch

- Author - Fireayehu Zekarias
- Github - [https://github.com/fireayehu](https://github.com/fireayehu)
- Twitter - [https://twitter.com/Fireayehu](https://twitter.com/Fireayehu)
- LinkedIn - [https://www.linkedin.com/in/fireayehu/](https://www.linkedin.com/in/fireayehu/)

## License

chapa-nodejs is [MIT licensed](LICENSE).

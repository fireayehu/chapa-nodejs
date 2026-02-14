<h1 align="center">
<div align="center">
  <a href="https://chapa.co/" target="_blank">
    <img src="./docs/logo.png" width="320" alt="Chapa Logo"/>
  </a>
  <p align="center">NodeJS SDK for Chapa Payment Gateway</p>
</div>
</h1>

<p align="center">
  <a href="https://www.npmjs.com/package/chapa-nodejs"><img src="https://img.shields.io/npm/v/chapa-nodejs.svg" alt="NPM Version" /></a>
  <a href="https://www.npmjs.com/package/chapa-nodejs"><img src="https://img.shields.io/npm/dm/chapa-nodejs.svg" alt="NPM Downloads" /></a>
  <a href="https://github.com/fireayehu/chapa-nodejs/actions"><img src="https://github.com/fireayehu/chapa-nodejs/workflows/CI/badge.svg" alt="CI Status" /></a>
  <a href="https://github.com/fireayehu/chapa-nodejs/blob/main/LICENSE"><img src="https://img.shields.io/npm/l/chapa-nodejs.svg" alt="License" /></a>
</p>

<p align="center">
  <a href="#features">Features</a> •
  <a href="#installation">Installation</a> •
  <a href="#quick-start">Quick Start</a> •
  <a href="#documentation">Documentation</a> •
  <a href="#contributing">Contributing</a>
</p>

---

## Features

**Core Features**

- Secure payment initialization (Web & Mobile)
- Payment verification
- Split payments & subaccounts
- Bank transfers (single & bulk)
- Direct charge (Telebirr, M-Pesa, etc.)
- Refund processing
- Webhook signature verification

**Developer Experience**

- Full TypeScript support with type definitions
- Input validation with Zod
- Automatic retry logic with exponential backoff for failed requests
- Request/response logging & debug mode
- Request cancellation support (AbortSignal)
- Comprehensive error handling
- 85%+ test coverage

## Installation

```bash
# NPM
npm install chapa-nodejs

# Yarn
yarn add chapa-nodejs

# PNPM
pnpm add chapa-nodejs
```

## Quick Start

```typescript
import { Chapa } from 'chapa-nodejs';

// Initialize with your secret key
const chapa = new Chapa({
  secretKey: process.env.CHAPA_SECRET_KEY,
});

// Initialize a payment
const tx_ref = await chapa.genTxRef();
const response = await chapa.initialize({
  first_name: 'John',
  last_name: 'Doe',
  email: 'john@example.com',
  currency: 'ETB',
  amount: '1000',
  tx_ref: tx_ref,
  callback_url: 'https://your-site.com/callback',
  return_url: 'https://your-site.com/return',
});

// Verify payment
const verification = await chapa.verify({ tx_ref });
```

## Configuration Options

```typescript
const chapa = new Chapa({
  secretKey: 'your-secret-key', // Required
  webhookSecret: 'your-webhook-secret', // Optional: for webhook verification
  logging: true, // Optional: enable request/response logging
  debug: true, // Optional: detailed debug information
  retries: 3, // Optional: retry failed requests (default: 0)
  retryDelay: 2000, // Optional: delay between retries in ms (default: 1000)
  timeout: 30000, // Optional: request timeout in ms (default: 30000)
});
```

### Request Cancellation

All async methods support cancellation via `AbortSignal`:

```typescript
const controller = new AbortController();
const timeoutId = setTimeout(() => controller.abort(), 5000);

try {
  const response = await chapa.initialize(
    {
      first_name: 'John',
      last_name: 'Doe',
      email: 'john@example.com',
      currency: 'ETB',
      amount: '1000',
      tx_ref: chapa.genTxRef(),
      return_url: 'https://example.com/return',
    },
    controller.signal
  );
} catch (error) {
  if (error.name === 'AbortError') {
    // Request was cancelled
  }
} finally {
  clearTimeout(timeoutId);
}
```

## Documentation

### Payment Operations

<details>
<summary><b>Initialize Transaction</b></summary>

```typescript
const response = await chapa.initialize({
  first_name: 'John',
  last_name: 'Doe',
  email: 'john@example.com',
  phone_number: '0911234567',
  currency: 'ETB',
  amount: '1000',
  tx_ref: await chapa.genTxRef(),
  callback_url: 'https://example.com/callback',
  return_url: 'https://example.com/return',
  customization: {
    title: 'Payment for Order #123',
    description: 'Thank you for your purchase',
  },
});
```

</details>

<details>
<summary><b>Verify Payment</b></summary>

```typescript
const response = await chapa.verify({
  tx_ref: 'TX-XXXXXXXXXXXXX',
});

if (response.data.status === 'success') {
  // Payment successful
}
```

</details>

<details>
<summary><b>Webhook Verification</b></summary>

```typescript
// Configure with webhook secret
const chapa = new Chapa({
  secretKey: 'your-secret-key',
  webhookSecret: 'your-webhook-secret',
});

// In your webhook endpoint
app.post('/webhook', (req, res) => {
  const signature = req.headers['x-chapa-signature'] as string;
  const rawBody = req.body; // ensure this is the raw body string
  const isValid = chapa.verifyWebhook(rawBody, signature);

  if (isValid) {
    // Process webhook
    res.status(200).send('OK');
  } else {
    res.status(401).send('Invalid signature');
  }
});
```

</details>

### Bank Operations

<details>
<summary><b>List Banks</b></summary>

```typescript
const banks = await chapa.getBanks();
```

</details>

<details>
<summary><b>Transfer Funds</b></summary>

```typescript
const response = await chapa.transfer({
  account_name: 'John Doe',
  account_number: '1234567890',
  amount: '1000',
  currency: 'ETB',
  reference: 'REF-123',
  bank_code: 128,
});
```

</details>

<details>
<summary><b>Bulk Transfer</b></summary>

```typescript
const response = await chapa.bulkTransfer({
  title: 'Monthly Payroll',
  currency: 'ETB',
  bulk_data: [
    {
      account_name: 'Employee 1',
      account_number: '1234567890',
      amount: '5000',
      reference: 'PAYROLL-001',
      bank_code: 128,
    },
    // ... more transfers
  ],
});
```

</details>

### Subaccounts & Split Payments

<details>
<summary><b>Create Subaccount</b></summary>

```typescript
import { SplitType } from 'chapa-nodejs';

const response = await chapa.createSubaccount({
  business_name: 'My Business',
  account_name: 'John Doe',
  bank_code: 128,
  account_number: '1234567890',
  split_type: SplitType.PERCENTAGE,
  split_value: 0.05, // 5%
});
```

</details>

<details>
<summary><b>Split Payment</b></summary>

```typescript
const response = await chapa.initialize({
  // ... other payment details
  subaccounts: [
    {
      id: 'subaccount-id',
      split_type: SplitType.FLAT,
      split_value: 100,
    },
  ],
});
```

</details>

### Direct Charge

<details>
<summary><b>Initiate Direct Charge</b></summary>

```typescript
const response = await chapa.directCharge({
  mobile: '0911234567',
  currency: 'ETB',
  amount: '100',
  tx_ref: await chapa.genTxRef(),
  type: 'telebirr',
});
```

</details>

### Refunds

<details>
<summary><b>Process Refund</b></summary>

```typescript
const response = await chapa.refund({
  tx_ref: 'TX-XXXXXXXXXXXXX',
  reason: 'Customer request',
  amount: '1000', // Optional: partial refund
});
```

</details>

### Utility Functions

<details>
<summary><b>Generate Transaction Reference</b></summary>

```typescript
// Default: TX-XXXXXXXXXXXXXXX
const ref1 = chapa.genTxRef();

// Custom prefix
const ref2 = chapa.genTxRef({ prefix: 'ORDER' });

// No prefix
const ref3 = chapa.genTxRef({ removePrefix: true });

// Custom size
const ref4 = chapa.genTxRef({ size: 20 });
```

</details>

## Error Handling

```typescript
import { HttpException } from 'chapa-nodejs';

try {
  const response = await chapa.initialize({...});
} catch (error) {
  if (error instanceof HttpException) {
    console.error(`Error ${error.status}: ${error.message}`);
  }
}
```

## TypeScript Support

Full TypeScript support with comprehensive type definitions:

```typescript
import {
  Chapa,
  InitializeOptions,
  InitializeResponse,
  VerifyResponse,
  SplitType,
} from 'chapa-nodejs';
```

## Requirements

- Node.js >= 18.0.0
- TypeScript >= 5.0 (for TypeScript projects)

## Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Contributors

<a href="https://github.com/fireayehu/chapa-nodejs/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=fireayehu/chapa-nodejs" />
</a>

### How to Contribute

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Project Stats

<p align="center">
  <img src="https://repobeats.axiom.co/api/embed/YOUR_REPO_ID.svg" alt="Repobeats analytics" />
</p>

<details>
<summary><b>Detailed Statistics</b></summary>

![Alt](https://repobeats.axiom.co/api/embed/YOUR_REPO_ID.svg 'Repobeats analytics image')

### Activity Graph

[![Activity Graph](https://github-readme-activity-graph.vercel.app/graph?username=fireayehu&repo=chapa-nodejs&theme=github-compact)](https://github.com/fireayehu/chapa-nodejs/graphs/contributors)

### Star History

[![Star History Chart](https://api.star-history.com/svg?repos=fireayehu/chapa-nodejs&type=Date)](https://star-history.com/#fireayehu/chapa-nodejs&Date)

</details>

## Testing

```bash
# Run tests
pnpm test

# Run tests with coverage
pnpm test:coverage

# Run tests in watch mode
pnpm test:watch
```

## Security

Please see our [Security Policy](SECURITY.md) for reporting vulnerabilities.

## Changelog

See [CHANGELOG.md](CHANGELOG.md) for release history.

## License

[MIT](LICENSE) © [Fireayehu Zekarias](https://github.com/fireayehu)

## Links

- [Chapa Official Website](https://chapa.co/)
- [Chapa API Documentation](https://developer.chapa.co/docs)
- [GitHub Repository](https://github.com/fireayehu/chapa-nodejs)
- [NPM Package](https://www.npmjs.com/package/chapa-nodejs)
- [Issue Tracker](https://github.com/fireayehu/chapa-nodejs/issues)

## Support

- Email: fireayehuzekarias@gmail.com
- [Report a Bug](https://github.com/fireayehu/chapa-nodejs/issues/new?template=bug_report.yml)
- [Request a Feature](https://github.com/fireayehu/chapa-nodejs/issues/new?template=feature_request.yml)
- [Ask a Question](https://github.com/fireayehu/chapa-nodejs/issues/new?template=question.yml)

---

<p align="center">Made with ❤️ by <a href="https://github.com/fireayehu">Fireayehu Zekarias</a></p>

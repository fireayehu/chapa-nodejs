## 2.1.1

### Patch Changes

- Add AbortSignal support for request cancellation, configurable timeout, exponential backoff for retries, and update TypeScript target to ES2020

### Minor Changes

- Major improvements and new features:
  - Added request/response logging with optional `logging` flag
  - Implemented retry logic for failed requests with `retries` and `retryDelay` options
  - Added webhook signature verification utility (`verifyWebhook` method)
  - Migrated from deprecated tsdx to modern Rollup build system
  - Improved error handling with TypeScript type guards and centralized error handling
  - Created dedicated axios instance with proper configuration
  - Fixed TypeScript configuration issues and enabled strict mode
  - Updated Husky to v9 with modern configuration
  - Added comprehensive CHANGELOG.md

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.2.0] - 2024-02-13

### Added

- Request/response logging capability with optional `logging` flag
- Retry logic for failed requests with configurable `retries` and `retryDelay` options
- Webhook signature verification utility (`verifyWebhook` method)
- `webhookSecret` option in ChapaOptions for webhook verification
- Standalone `verifyWebhookSignature` function for webhook validation
- TypeScript strict mode for enhanced type safety
- Node.js type definitions for better IDE support

### Changed

- Migrated from deprecated `tsdx` to modern Rollup build system
- Updated Husky configuration from v4 to v9 format
- Improved error handling with proper TypeScript type guards
- Centralized error handling with `withErrorHandling` utility function
- Created dedicated axios instance with proper configuration (base URL, timeout, headers)
- Optimized tsconfig.json for Node.js environment (removed DOM lib, added strict mode)
- Updated package.json with proper `types` field and modern tooling

### Fixed

- TypeScript configuration issues (removed conflicting `noEmit`, unnecessary `jsx` and `dom` lib)
- Duplicate error handling code across all methods
- Missing type safety in error handling
- Husky hooks configuration for v9 compatibility
- Module type warning in rollup.config (renamed to .mjs)

### Improved

- Code maintainability with DRY principles
- Type safety throughout the codebase
- Build configuration and output
- Error messages and handling
- Developer experience with better TypeScript support

### Dependencies

- Added `crypto-js` for webhook signature verification
- Added `@types/crypto-js` for TypeScript support
- Added `@types/node` for Node.js type definitions
- Added Rollup and related plugins for modern build system
- Added ESLint for code quality
- Removed deprecated `tsdx` package
- Removed `size-limit` package

## [2.1.0] - Previous Release

### Features

- Initialize Transaction
- Split Payment
- Verify Payment
- List Banks
- Create Subaccount
- All Transaction
- Transaction Logs
- Transfer
- Bulk Transfer
- Verify Transfer
- All Transfer
- Direct Charge
- Authorize Direct Charge
- Refund
- Generate Transaction Reference
- Full TypeScript Support

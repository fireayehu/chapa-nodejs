# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 2.3.x   | :white_check_mark: |
| 2.2.x   | :white_check_mark: |
| < 2.2   | :x:                |

## Reporting a Vulnerability

We take security vulnerabilities seriously. If you discover a security issue, please follow these steps:

### Do NOT

- Open a public GitHub issue
- Disclose the vulnerability publicly before it has been addressed

### Do

1. **Email** the maintainer directly at: fireayehuzekarias@gmail.com
2. **Include** the following information:
   - Description of the vulnerability
   - Steps to reproduce
   - Potential impact
   - Suggested fix (if any)

### What to Expect

- **Acknowledgment**: Within 48 hours
- **Initial Assessment**: Within 5 business days
- **Status Updates**: Every 7 days until resolved
- **Fix Timeline**: Critical issues within 7 days, others within 30 days

### Disclosure Policy

- We will coordinate disclosure with you
- Security advisories will be published on GitHub
- Credit will be given to reporters (unless anonymity is requested)

## Security Best Practices

When using chapa-nodejs:

1. **Never commit** your secret keys to version control
2. **Use environment variables** for sensitive data
3. **Keep dependencies updated** regularly
4. **Enable webhook signature verification** for production
5. **Use HTTPS** for all API communications
6. **Implement rate limiting** in your application
7. **Log and monitor** suspicious activities

## Security Features

- ✅ Webhook signature verification (HMAC-SHA256)
- ✅ Type-safe validation (Zod)
- ✅ Secure error handling
- ✅ No sensitive data in logs (when debug mode off)

Thank you for helping keep chapa-nodejs secure!

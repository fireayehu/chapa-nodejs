# Contributing to chapa-nodejs

Thank you for your interest in contributing to chapa-nodejs! We welcome contributions from the community.

## Code of Conduct

By participating in this project, you agree to maintain a respectful and inclusive environment for everyone.

## How to Contribute

### Reporting Bugs

1. Check if the bug has already been reported in [Issues](https://github.com/fireayehu/chapa-nodejs/issues)
2. If not, create a new issue using the Bug Report template
3. Provide as much detail as possible including:
   - Package version
   - Node.js version
   - Steps to reproduce
   - Expected vs actual behavior
   - Code samples

### Suggesting Features

1. Check if the feature has already been requested
2. Create a new issue using the Feature Request template
3. Clearly describe the problem and proposed solution
4. Provide example usage if possible

### Pull Requests

1. **Fork the repository** and create your branch from `main`
2. **Install dependencies**: `pnpm install`
3. **Make your changes** following our coding standards
4. **Add tests** for any new functionality
5. **Run tests**: `pnpm test`
6. **Run linter**: `pnpm run lint`
7. **Build the project**: `pnpm run build`
8. **Commit your changes** with clear commit messages
9. **Push to your fork** and submit a pull request

## Development Setup

```bash
# Clone your fork
git clone https://github.com/YOUR_USERNAME/chapa-nodejs.git
cd chapa-nodejs

# Install dependencies
pnpm install

# Run tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run linter
pnpm run lint

# Build the project
pnpm run build
```

## Coding Standards

### TypeScript

- Use TypeScript for all code
- Enable strict mode
- Provide proper type definitions
- Avoid using `any` type

### Code Style

- Follow existing code style
- Use ESLint configuration
- Use Prettier for formatting
- Write clear, self-documenting code
- Add comments for complex logic

### Testing

- Write tests for all new features
- Maintain or improve code coverage
- Use descriptive test names
- Follow AAA pattern (Arrange, Act, Assert)

### Commits

- Use clear, descriptive commit messages
- Follow conventional commits format:
  - `feat:` for new features
  - `fix:` for bug fixes
  - `docs:` for documentation
  - `test:` for tests
  - `refactor:` for refactoring
  - `chore:` for maintenance

Example:
```
feat: add webhook signature verification
fix: handle timeout errors correctly
docs: update README with new examples
```

## Project Structure

```
chapa-nodejs/
├── src/
│   ├── chapa.ts           # Main SDK class
│   ├── interfaces/        # TypeScript interfaces
│   ├── validations/       # Zod validation schemas
│   ├── enums/            # Enumerations
│   └── types/            # Type definitions
├── test/                 # Test files
├── dist/                 # Build output
└── docs/                 # Documentation
```

## Testing Guidelines

- Write unit tests for all functions
- Mock external dependencies (axios)
- Test both success and error scenarios
- Aim for >80% code coverage
- Run `pnpm test:coverage` to check coverage

## Documentation

- Update README.md for new features
- Add JSDoc comments for public APIs
- Update CHANGELOG.md following Keep a Changelog format
- Include code examples where helpful

## Release Process

Releases are managed by maintainers using changesets:

1. Create changeset: `pnpm changeset`
2. Version bump: `pnpm version`
3. Publish: `pnpm release`

## Questions?

- Open a [Question issue](https://github.com/fireayehu/chapa-nodejs/issues/new/choose)
- Check existing [documentation](https://github.com/fireayehu/chapa-nodejs#readme)
- Review [Chapa API docs](https://developer.chapa.co/docs)

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

## Recognition

Contributors will be recognized in the project's README and release notes.

Thank you for contributing! 🎉

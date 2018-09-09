
# ts-healthcheck-middleware

Repo for ts-healthcheck-middleware NPM package

An Express middleware for creating a health endpoint, written in Typescript

## Usage

**1. Install the library:**

```
npm install --save ts-healthcheck-middleware
```

**2. Import the factory function:**

```
const { factory as healthcheckFactory } from 'ts-healthcheck-middleware';
```

**3. Use the middleware with default settings:**

```
myExpressApp.use(healtcheckFactory());
```

**Or use your own custom settings:**

```
myExpressApp.use(healtcheckFactory('/my-health/endpoint', 'My healthy message'));
```

## Development

### Goodies

- `npm run release [major|minor|patch]`: builds, bumps, and publishes your lib
- `npm run build`: compile typescript
- `npm run test`: run unit tests

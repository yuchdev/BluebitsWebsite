# Bluebits Website

Prototype website for Bluebits.

## Stack

- **Language**: JavaScript
- **Runtime**: Node.js
- **Package manager**: npm

> Note: Script names, entry points, and tooling are defined in `package.json`. This README documents the common npm workflow and leaves placeholders where project-specific values may differ.

## Requirements

- Node.js (LTS recommended)

## Setup

```bash
npm install
```

## Run

Common options (use the one that exists in `package.json`):

```bash
npm start
```

```bash
npm run dev
```

If the project is a static site or build step is required:

```bash
npm run build
npm run preview
```

## Scripts

Scripts are defined in `package.json` under `scripts`. Typical scripts you may see:

- `npm start` - run the app in production mode
- `npm run dev` - run the app in development mode (watch/hot reload)
- `npm run build` - create a production build
- `npm run lint` - run linters
- `npm test` - run tests

To list scripts:

```bash
npm run
```

## Entry points

Entry points depend on the framework/tooling and are defined by `package.json` and/or config files.

Check:

- `package.json` fields: `main`, `module`, `type`
- Common source roots: `src/`, `public/`
- Common entry files: `src/index.js`, `src/main.js`, `server.js`, `app.js`

## Environment variables

Environment variables (if used) are typically provided via a `.env` file or your shell.

Create a `.env` file (if supported by the project) and set values as needed, for example:

- `NODE_ENV` - `development` or `production`
- `PORT` - server port (if the project runs an HTTP server)

Example:

```bash
# macOS / Linux
export PORT=3000
npm run dev
```

If a `.env.example` exists, copy it:

```bash
cp .env.example .env
```

## Tests

If the repository includes tests, run:

```bash
npm test
```

If there is a watch mode:

```bash
npm run test:watch
```

## Project structure

(Common layout; actual structure may vary.)

- `README.md` - project documentation
- `package.json` - dependencies and npm scripts
- `src/` - application source code
- `public/` - static assets (if applicable)
- `tests/` or `__tests__/` - test files (if applicable)
- `dist/` or `build/` - production build output (generated)

## License

No license file is specified here. If a `LICENSE` file exists in the repository root, it applies. Otherwise, all rights reserved by default.

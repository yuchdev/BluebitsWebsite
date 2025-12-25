### Project Guidelines

### 1. Build/Configuration Instructions

This project is a static website prototype. It uses Node.js and npm for managing developer tools and testing.

#### Prerequisites
- **Node.js**: LTS version recommended.
- **npm**: Installed with Node.js.

#### Setup
1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```

#### Project Structure
- `index.html`, `blog.html`, `services.html`, `contact.html`, `tools.html`: Main pages of the website.
- `styles.css`: Central stylesheet.
- `index.js`: Main JavaScript entry point (currently a placeholder).
- `package.json`: Contains project metadata and scripts.

---

### 2. Testing Information

The project uses **Vitest** for unit testing and logic verification.

#### Running Tests
To run tests once:
```bash
npm test
```

To run tests in watch mode during development:
```bash
npx vitest
```

#### Adding New Tests
1. Create a new file ending in `.test.js` (e.g., `utils.test.js`).
2. Use the Vitest API (`describe`, `it`, `expect`) to define your test cases.

**Example Test (`example.test.js`):**
```javascript
import { describe, it, expect } from 'vitest';

describe('Math Logic', () => {
  it('should add numbers correctly', () => {
    expect(1 + 1).toBe(2);
  });
});
```

#### Guidelines
- Focus tests on business logic and utility functions.
- For DOM-related tests, use the `jsdom` environment (configured via Vitest comments or config if needed).
- Mock external dependencies where appropriate to keep tests fast and isolated.

---

### 3. Additional Development Information

#### Code Style
- Follow standard JavaScript (ES6+) practices.
- Use semantic HTML tags in the `.html` files (already implemented).
- Maintain CSS organization in `styles.css` using the existing BEM-like naming (e.g., `.nav-links`, `.nav-logo`).

#### Development Workflow
- The project is currently a prototype. Most logic should reside in `index.js` as it grows.
- For live previewing, you can use any static server, such as `npx serve .` or the VS Code Live Server extension.
- Always run tests before pushing changes to ensure no regressions in logic.

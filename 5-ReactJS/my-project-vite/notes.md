# Vite + React Project Setup - Detailed Notes

## What is Vite?

Vite (French for "fast") is a modern build tool that provides fast development server startup and Hot Module Replacement (HMR). It uses ESBuild for development and Rollup for production builds.

## Creating a Vite React Project

```bash
npm create vite@latest my-project-vite -- --template react
cd my-project-vite
npm install
npm run dev
```

## Available Scripts

| Command           | Purpose                              |
| ----------------- | ------------------------------------ |
| `npm run dev`     | Start development server             |
| `npm run build`   | Build for production (output: dist/) |
| `npm run preview` | Preview production build locally     |

## Vite Config

```js
// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // custom port
  },
});
```

## ESLint Configuration

Vite projects come with ESLint pre-configured:

```js
// eslint.config.js
import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";

export default [
  { ignores: ["dist"] },
  {
    files: ["**/*.{js,jsx}"],
    languageOptions: {
      globals: globals.browser,
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
  },
];
```

## Environment Variables

Vite uses `.env` files for environment variables. Variables must start with `VITE_`:

```env
VITE_API_URL=https://api.example.com
VITE_APP_NAME=My App
```

Access in code:

```jsx
const apiUrl = import.meta.env.VITE_API_URL;
```

## Key Takeaways

- Vite is the modern standard for React project setup
- Instant HMR makes development experience smooth
- Uses `.jsx` extension and `main.jsx` as entry point
- Environment variables must be prefixed with `VITE_`
- Production builds use Rollup for optimized output

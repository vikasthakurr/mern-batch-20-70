# Create React App (CRA) Setup - Detailed Notes

## What is Create React App?

Create React App (CRA) was the official tool by Facebook to set up a React project with zero configuration. It uses Webpack under the hood.

> **Note**: CRA is now deprecated. Use Vite for new projects.

## Setup Command

```bash
npx create-react-app my-project
cd my-project
npm start
```

## CRA Project Structure

```
my-project/
├── node_modules/
├── public/
│   ├── index.html
│   └── favicon.ico
├── src/
│   ├── App.js
│   ├── App.css
│   ├── App.test.js
│   ├── index.js
│   ├── index.css
│   ├── logo.svg
│   ├── reportWebVitals.js
│   └── setupTests.js
├── package.json
└── README.md
```

## Key Differences: CRA vs Vite

| Feature        | CRA (Webpack)  | Vite                |
| -------------- | -------------- | ------------------- |
| File extension | `.js`          | `.jsx`              |
| Entry file     | `src/index.js` | `src/main.jsx`      |
| Dev server     | `npm start`    | `npm run dev`       |
| Build speed    | Slow           | Very fast           |
| HMR            | Slower         | Instant             |
| Status         | Deprecated     | Actively maintained |

## Entry Point (CRA)

```jsx
// src/index.js
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
```

## Key Takeaways

- CRA was the go-to tool but is now deprecated
- Vite is the recommended replacement for new projects
- CRA uses `.js` extension, Vite uses `.jsx`
- CRA entry is `index.js`, Vite entry is `main.jsx`
- If migrating, switch from CRA to Vite for better performance

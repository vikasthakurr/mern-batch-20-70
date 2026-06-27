# React Introduction & Vite Setup - Detailed Notes

## What is React?

React is a JavaScript library for building user interfaces. Created by Facebook (Meta), it lets you build reusable UI components and efficiently update the DOM using a Virtual DOM.

## Key Features of React

- **Component-Based**: Build encapsulated components that manage their own state
- **Virtual DOM**: Efficient updates by comparing virtual and real DOM
- **Declarative**: Describe what the UI should look like, React handles the how
- **Unidirectional Data Flow**: Data flows from parent to child via props
- **JSX**: Write HTML-like syntax in JavaScript

## Setting Up a React Project with Vite

```bash
npm create vite@latest my-app -- --template react
cd my-app
npm install
npm run dev
```

## Project Structure (Vite + React)

```
my-app/
├── node_modules/
├── public/
├── src/
│   ├── assets/
│   ├── App.jsx
│   ├── App.css
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
└── vite.config.js
```

## Important Files

| File             | Purpose                                 |
| ---------------- | --------------------------------------- |
| `index.html`     | Entry HTML file (has `<div id="root">`) |
| `main.jsx`       | Entry JS file that renders App into DOM |
| `App.jsx`        | Root component of the application       |
| `vite.config.js` | Vite build tool configuration           |

## JSX Rules

1. Must return a single parent element (use `<>...</>` fragments)
2. Use `className` instead of `class`
3. Use `htmlFor` instead of `for`
4. Close all tags (e.g., `<img />`, `<br />`)
5. JavaScript expressions go inside `{}`

## Basic Component

```jsx
const App = () => {
  return (
    <div>
      <h1>Hello React!</h1>
      <p>This is my first component</p>
    </div>
  );
};

export default App;
```

## Vite vs Create React App (CRA)

| Feature     | Vite                | CRA                |
| ----------- | ------------------- | ------------------ |
| Speed       | Very fast (ESBuild) | Slower (Webpack)   |
| Bundle size | Smaller             | Larger             |
| Config      | Minimal             | Hidden (ejectable) |
| HMR         | Instant             | Slower             |
| Recommended | Yes (2024+)         | Deprecated         |

## Key Takeaways

- React is a library, not a full framework
- Components are the building blocks of React apps
- Vite is the modern, recommended way to set up React projects
- JSX lets you write HTML-like code inside JavaScript
- Everything starts from `main.jsx` rendering `<App />` into the root div

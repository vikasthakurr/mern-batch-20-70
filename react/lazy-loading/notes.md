# Lazy Loading in React - Detailed Notes

## What is Lazy Loading?

Lazy loading is a technique where components are loaded only when they are needed (on-demand) rather than loading everything upfront. This reduces the initial bundle size and improves app performance.

## Why Use Lazy Loading?

- **Faster initial load**: Smaller initial JavaScript bundle
- **Better performance**: Load code only when user needs it
- **Code splitting**: Automatically splits code into separate chunks
- **Reduced bandwidth**: Users don't download unused code

## React.lazy()

`React.lazy()` lets you define a component that is loaded dynamically. It takes a function that calls `import()`.

```jsx
import { lazy } from "react";

// Instead of: import HeavyComponent from "./HeavyComponent";
const HeavyComponent = lazy(() => import("./HeavyComponent"));
```

## Suspense

`Suspense` is a React component that shows a fallback UI while the lazy component is loading.

```jsx
import { lazy, Suspense } from "react";

const HeavyComponent = lazy(() => import("./HeavyComponent"));

const App = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HeavyComponent />
    </Suspense>
  );
};
```

## Route-Based Lazy Loading

Best practice is to lazy load at the route level:

```jsx
import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Dashboard = lazy(() => import("./pages/Dashboard"));

const App = () => {
  return (
    <Suspense fallback={<p>Loading page...</p>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Suspense>
  );
};
```

## With Skeleton UI as Fallback

```jsx
import { lazy, Suspense } from "react";
import Skeleton from "./Skeleton";

const Card = lazy(() => import("./Card"));

const App = () => {
  return (
    <Suspense fallback={<Skeleton />}>
      <Card />
    </Suspense>
  );
};
```

## How It Works Behind the Scenes

1. Webpack/Vite splits the lazy component into a separate chunk
2. On initial load, only the main bundle is downloaded
3. When the component is needed, React fetches the chunk
4. `Suspense` shows the fallback while the chunk loads
5. Once loaded, the component renders normally

## Important Rules

- `React.lazy` only works with default exports
- Always wrap lazy components in `Suspense`
- Place `Suspense` at a logical boundary (route level or section level)
- Can nest multiple `Suspense` boundaries

## Key Takeaways

- `React.lazy()` + `Suspense` = Code splitting made easy
- Best applied at route level for maximum benefit
- Use meaningful fallback UI (skeleton screens > "Loading..." text)
- Improves Time to Interactive (TTI) for large applications
- Works out of the box with Vite and Webpack

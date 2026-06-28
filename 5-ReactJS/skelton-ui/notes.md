# Skeleton UI - Detailed Notes

## What is Skeleton UI?

A Skeleton UI (or Skeleton Screen) is a placeholder loading state that mimics the layout of the actual content before it loads. Instead of showing a spinner or "Loading..." text, it shows gray animated shapes that represent the structure of the page.

## Why Use Skeleton UI?

- **Better UX**: Users perceive faster load times
- **Reduced layout shift**: Content doesn't jump around when data loads
- **Visual feedback**: Users know something is loading and what to expect
- **Professional look**: Modern apps (YouTube, Facebook, LinkedIn) all use skeletons

## Basic Skeleton Component with Tailwind CSS

```jsx
const Skeleton = () => {
  return (
    <div className="w-72 bg-white rounded-2xl shadow-lg overflow-hidden">
      {/* Image placeholder */}
      <div className="h-56 bg-gray-200 animate-pulse" />

      {/* Content placeholders */}
      <div className="p-4 space-y-3">
        <div className="h-5 bg-gray-200 rounded-md animate-pulse w-3/4" />
        <div className="h-4 bg-gray-200 rounded-md animate-pulse w-1/2" />
        <div className="h-6 bg-gray-200 rounded-md animate-pulse w-1/3" />
        <div className="h-10 bg-gray-200 rounded-xl animate-pulse w-full" />
      </div>
    </div>
  );
};
```

## Implementation Pattern

```jsx
import { useState, useEffect } from "react";
import Card from "./Card";
import Skeleton from "./Skeleton";

const App = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("https://api.example.com/products")
      .then((res) => res.json())
      .then((result) => {
        setData(result);
        setLoading(false);
      });
  }, []);

  return loading ? <Skeleton /> : <Card data={data} />;
};
```

## With React.lazy and Suspense

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

## Skeleton Design Tips

- Match the skeleton layout exactly to the real content
- Use `animate-pulse` (Tailwind) or CSS animation for shimmer effect
- Keep consistent border radius and spacing
- Use varying widths for text lines to look natural

## animate-pulse (Tailwind)

Tailwind's `animate-pulse` class adds a subtle fade in/out animation to create the shimmer/loading effect.

```html
<div className="animate-pulse bg-gray-200 h-4 w-full rounded"></div>
```

## Key Takeaways

- Skeleton screens improve perceived performance
- Always match skeleton structure to real content layout
- Use conditional rendering: `loading ? <Skeleton /> : <Content />`
- Can also be used with React Suspense for lazy-loaded components
- Tailwind's `animate-pulse` makes it easy to add shimmer effects

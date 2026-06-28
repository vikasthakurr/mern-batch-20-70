# React.memo - Detailed Notes

## What is React.memo?

`React.memo` is a Higher Order Component (HOC) that wraps a component and prevents it from re-rendering if its props haven't changed. It performs a shallow comparison of previous and current props.

## Syntax

```jsx
const MemoizedComponent = React.memo(MyComponent);

// or with custom comparison
const MemoizedComponent = React.memo(MyComponent, arePropsEqual);
```

## The Problem React.memo Solves

By default, when a parent re-renders, ALL its child components also re-render — even if their props haven't changed.

```jsx
// Without React.memo - Child re-renders every time Parent renders
const Child = ({ name }) => {
  console.log("Child rendered");
  return <p>{name}</p>;
};

// With React.memo - Child only re-renders when 'name' changes
const Child = React.memo(({ name }) => {
  console.log("Child rendered");
  return <p>{name}</p>;
});
```

## Example

```jsx
import { useState, memo } from "react";

const ExpensiveChild = memo(({ data }) => {
  console.log("ExpensiveChild rendered");
  return <p>{data}</p>;
});

const Parent = () => {
  const [count, setCount] = useState(0);
  const [text, setText] = useState("Hello");

  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      {/* This won't re-render when count changes */}
      <ExpensiveChild data={text} />
    </div>
  );
};
```

## Custom Comparison Function

```jsx
const areEqual = (prevProps, nextProps) => {
  // Return true if props are equal (skip re-render)
  // Return false if props are different (re-render)
  return prevProps.id === nextProps.id;
};

const MyComponent = React.memo(({ id, name }) => {
  return <p>{name}</p>;
}, areEqual);
```

## React.memo + useCallback + useMemo

For full optimization, combine all three:

```jsx
import { useState, useCallback, useMemo, memo } from "react";

const Child = memo(({ onClick, items }) => {
  console.log("Child rendered");
  return <button onClick={onClick}>{items.length} items</button>;
});

const Parent = () => {
  const [count, setCount] = useState(0);

  const handleClick = useCallback(() => {
    console.log("clicked");
  }, []);

  const items = useMemo(() => [1, 2, 3], []);

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Count: {count}</button>
      <Child onClick={handleClick} items={items} />
    </div>
  );
};
```

## When to Use React.memo

- Components that render the same output given the same props
- Components that re-render frequently
- Components that render large lists or complex UI
- When parent updates often but child props rarely change

## When NOT to Use React.memo

- Components that almost always receive different props
- Very simple/cheap components (overhead of comparison isn't worth it)
- Components that receive objects/arrays as props without memoization

## Key Takeaways

- `React.memo` does a **shallow comparison** of props
- Only prevents re-renders if props haven't changed
- Combine with `useCallback` for function props and `useMemo` for object/array props
- Don't wrap every component — profile first, then optimize
- It's a performance optimization, not a guarantee

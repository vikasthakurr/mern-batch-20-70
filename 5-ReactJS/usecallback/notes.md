# useCallback Hook - Detailed Notes

## What is useCallback?

`useCallback` is a React Hook that memoizes (caches) a function definition. It returns the same function reference between re-renders unless its dependencies change. This is useful to prevent unnecessary re-renders of child components that receive functions as props.

## Syntax

```jsx
const memoizedFn = useCallback(() => {
  // function logic
}, [dependencies]);
```

## The Problem useCallback Solves

In React, every time a parent component re-renders, all functions inside it are recreated as new references. If these functions are passed as props to child components wrapped in `React.memo`, the child still re-renders because it receives a "new" function each time.

```jsx
// Without useCallback - new function on every render
const handleClick = () => {
  console.log("clicked");
};

// With useCallback - same reference unless deps change
const handleClick = useCallback(() => {
  console.log("clicked");
}, []);
```

## Example with React.memo

```jsx
import { useState, useCallback, memo } from "react";

const Child = memo(({ onClick, name }) => {
  console.log(`${name} rendered`);
  return <button onClick={onClick}>{name}</button>;
});

const Parent = () => {
  const [count, setCount] = useState(0);
  const [text, setText] = useState("");

  // Without useCallback: Child re-renders on every parent render
  // With useCallback: Child only re-renders when needed
  const handleClick = useCallback(() => {
    setCount((prev) => prev + 1);
  }, []);

  return (
    <div>
      <h1>Count: {count}</h1>
      <input value={text} onChange={(e) => setText(e.target.value)} />
      <Child onClick={handleClick} name="Click Me" />
    </div>
  );
};
```

## useCallback vs useMemo

| Feature    | useCallback               | useMemo                |
| ---------- | ------------------------- | ---------------------- |
| Returns    | Memoized **function**     | Memoized **value**     |
| Use case   | Stable function refs      | Expensive calculations |
| Equivalent | `useMemo(() => fn, deps)` | —                      |

```jsx
// These are equivalent:
useCallback(fn, deps);
useMemo(() => fn, deps);
```

## When to Use useCallback

- Passing callbacks to child components wrapped in `React.memo`
- Functions used as dependencies in other Hooks (useEffect)
- Event handlers passed to many list items
- Functions that are expensive to create

## When NOT to Use useCallback

- Functions that don't get passed to child components
- Components without `React.memo` (no benefit)
- Simple components that render fast anyway
- Premature optimization without profiling

## Key Takeaways

- `useCallback` caches the **function itself**, not its result
- Must be used with `React.memo` on child components to be effective
- Prevents unnecessary re-renders caused by new function references
- Only useful when referential equality matters
- Don't wrap every function — use it strategically where it matters

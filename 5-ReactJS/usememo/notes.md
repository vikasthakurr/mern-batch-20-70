# useMemo Hook - Detailed Notes

## What is useMemo?

`useMemo` is a React Hook that memoizes (caches) the result of an expensive computation. It only recalculates the value when one of its dependencies changes, preventing unnecessary re-computations on every render.

## Syntax

```jsx
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
```

## Why useMemo?

Without memoization, expensive functions re-run on every render even if their inputs haven't changed:

```jsx
// BAD - runs on every render
const result = heavyCalculation();

// GOOD - only runs when dependencies change
const result = useMemo(() => heavyCalculation(), [dependency]);
```

## Example - Expensive Calculation

```jsx
import { useMemo, useState } from "react";

const App = () => {
  const [count, setCount] = useState(0);
  const [otherState, setOtherState] = useState(0);

  // Only recalculates when count changes, not when otherState changes
  const expensiveResult = useMemo(() => {
    console.log("Heavy function running...");
    let sum = 0;
    for (let i = 0; i < 1000000000; i++) {
      sum += i;
    }
    return sum;
  }, [count]);

  return (
    <div>
      <h1>Result: {expensiveResult}</h1>
      <button onClick={() => setCount(count + 1)}>Change Count</button>
      <button onClick={() => setOtherState(otherState + 1)}>Other</button>
    </div>
  );
};
```

## useMemo vs useCallback

| Feature  | useMemo                        | useCallback                   |
| -------- | ------------------------------ | ----------------------------- |
| Returns  | Memoized **value**             | Memoized **function**         |
| Use case | Expensive calculations         | Passing callbacks to children |
| Syntax   | `useMemo(() => value, [deps])` | `useCallback(fn, [deps])`     |

```jsx
// useMemo - caches the RESULT
const value = useMemo(() => computeValue(a), [a]);

// useCallback - caches the FUNCTION itself
const fn = useCallback(() => doSomething(a), [a]);
```

## When to Use useMemo

- Heavy computations (sorting large arrays, complex math)
- Filtering/transforming large datasets
- Creating objects/arrays passed as props to memoized children
- Avoiding unnecessary re-renders of child components

## When NOT to Use useMemo

- Simple calculations (the memoization overhead isn't worth it)
- Values that change on every render anyway
- Premature optimization without measuring first

## Key Takeaways

- `useMemo` caches the **return value** of a function
- Only recalculates when dependencies change
- Helps with performance optimization for expensive operations
- Don't overuse — only memoize when there's a real performance benefit
- Combine with `React.memo` and `useCallback` for full optimization

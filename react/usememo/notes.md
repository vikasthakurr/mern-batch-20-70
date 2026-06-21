# useMemo, useCallback & React.memo

## What is useMemo?

`useMemo` is a React hook that **memoizes the return value** of a function. It only recalculates the value when one of its dependencies changes. This prevents expensive computations from running on every render.

```jsx
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
```

---

## Why Do We Need useMemo?

Every time a component re-renders, all the code inside it runs again — including expensive calculations. If a calculation takes time (like a loop with a billion iterations), it slows down every re-render, even when the inputs haven't changed.

`useMemo` caches the result and only recomputes when dependencies change.

---

## useMemo Example

```jsx
import { useMemo, useState } from "react";

const App = () => {
  const [count, setCount] = useState(0);

  // Without useMemo — runs on EVERY render (slow)
  // const result = sum();

  // With useMemo — runs only once (empty deps) or when deps change
  const result = useMemo(() => {
    console.log("heavy function called");
    let sum = 0;
    for (let i = 0; i < 1000000000; i++) {
      sum = sum + i;
    }
    return sum;
  }, []);

  return (
    <div>
      <h1>Sum: {result}</h1>
      <h1>Count: {count}</h1>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
};
```

Without `useMemo`, clicking "Increment" would freeze the UI because `sum()` recalculates every render. With `useMemo`, it only calculates once.

---

## What is useCallback?

`useCallback` is a React hook that **memoizes a function itself** (not its return value). It returns the same function reference between renders unless its dependencies change.

```jsx
const memoizedFn = useCallback(() => {
  doSomething(a, b);
}, [a, b]);
```

---

## useMemo vs useCallback

| Feature  | useMemo                            | useCallback                           |
| -------- | ---------------------------------- | ------------------------------------- |
| Memoizes | A computed **value**               | A **function reference**              |
| Returns  | The result of calling the function | The function itself                   |
| Use case | Expensive calculations             | Passing callbacks to child components |
| Syntax   | `useMemo(() => fn(), [deps])`      | `useCallback(fn, [deps])`             |

```jsx
// These are equivalent:
const memoizedValue = useMemo(() => computeValue(), [deps]);
const memoizedFn = useCallback(someFunction, [deps]);

// useCallback(fn, deps) is the same as useMemo(() => fn, deps)
```

---

## What is React.memo?

`React.memo` is a **Higher-Order Component (HOC)** that prevents a component from re-rendering if its props haven't changed. It does a **shallow comparison** of props.

```jsx
import { memo } from "react";

const Child = () => {
  console.log("child component loaded");
  return <div>Child</div>;
};

export default memo(Child);
```

---

## Why useCallback + React.memo Work Together

Without `useCallback`, even if you wrap a child with `React.memo`, passing a function as a prop will cause re-renders because functions get recreated on each render (new reference).

```jsx
// WITHOUT useCallback — Child re-renders every time Parent re-renders
const Parent = () => {
  const handleClick = () => console.log("clicked");
  // handleClick is a NEW function on every render
  return <Child onClick={handleClick} />;
};

// WITH useCallback — Child does NOT re-render (same function reference)
const Parent = () => {
  const handleClick = useCallback(() => console.log("clicked"), []);
  // handleClick is the SAME function across renders
  return <Child onClick={handleClick} />;
};
```

---

## Complete Example (useMemo + useCallback + React.memo)

```jsx
// App.jsx
import { useCallback, useMemo, useState } from "react";
import Child from "./Child";

const App = () => {
  const [count, setCount] = useState(0);
  const [childCount, setChildCount] = useState(0);

  // useMemo — caches the expensive calculation
  const result = useMemo(() => {
    let sum = 0;
    for (let i = 0; i < 1000000000; i++) {
      sum += i;
    }
    return sum;
  }, []);

  // useCallback — caches the function reference
  const sayHi = useCallback(() => {
    return "Hi from parent!";
  }, []);

  return (
    <div>
      <h1>Sum: {result}</h1>
      <h1>Count: {count}</h1>
      <button onClick={() => setCount(count + 1)}>Parent Count</button>

      <p>Child Count: {childCount}</p>
      <button onClick={() => setChildCount(childCount + 1)}>Child Count</button>

      {/* Child only re-renders when its props change */}
      <Child count1={childCount} sayHi1={sayHi} />
    </div>
  );
};
```

```jsx
// Child.jsx
import { memo } from "react";

const Child = ({ count1, sayHi1 }) => {
  console.log("child component loaded");
  return (
    <div>
      <p>Child received: {count1}</p>
    </div>
  );
};

export default memo(Child);
```

---

## When to Use What

| Scenario                                   | Solution                            |
| ------------------------------------------ | ----------------------------------- |
| Expensive calculation slowing renders      | `useMemo`                           |
| Function prop causing child re-renders     | `useCallback` + `React.memo`        |
| Child re-renders despite same props        | Wrap child with `React.memo`        |
| Object/array prop causing child re-renders | `useMemo` the object + `React.memo` |

---

## When NOT to Use These

- **Don't prematurely optimize** — only use when you have a measurable performance problem
- **Simple calculations** don't need `useMemo` — the memoization overhead can be worse than just recalculating
- **Components that always receive new props** won't benefit from `React.memo`
- **If a component renders fast anyway**, adding `memo` adds complexity without benefit

---

## How React.memo Compares Props

```jsx
// Shallow comparison (default)
memo(Child);
// { name: "John" } === { name: "John" } → false (different reference!)
// "John" === "John" → true

// Custom comparison function
memo(Child, (prevProps, nextProps) => {
  return prevProps.id === nextProps.id; // only re-render if id changes
});
```

---

## Common Mistakes

### 1. Object/Array Dependencies

```jsx
// BAD — new object every render, useMemo never caches
const config = { theme: "dark" };
const value = useMemo(() => compute(config), [config]);

// GOOD — memoize the object too, or use primitive deps
const value = useMemo(() => compute("dark"), ["dark"]);
```

### 2. Forgetting React.memo on Child

```jsx
// useCallback alone doesn't prevent re-renders!
// The CHILD must be wrapped with React.memo
const fn = useCallback(() => {}, []);
return <Child onClick={fn} />; // Still re-renders without memo(Child)
```

### 3. Empty useMemo

```jsx
// POINTLESS — no expensive computation here
const name = useMemo(() => "Hello", []);
// Just use: const name = "Hello";
```

---

## Key Points to Remember

- `useMemo` = memoize a **value** (cache expensive computation results)
- `useCallback` = memoize a **function** (keep the same function reference)
- `React.memo` = memoize a **component** (skip re-render if props haven't changed)
- `useCallback` is only useful when paired with `React.memo` on the child
- All three use shallow comparison by default
- Don't overuse — measure first, optimize second
- `useMemo(() => fn, deps)` is equivalent to `useCallback(fn, deps)`
